import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import { products as defaultProducts } from '@/constants/products';

/**
 * MySQL connection pool
 */
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});

/**
 * Initialize database schema
 */
export async function initDatabase() {
  const connection = await pool.getConnection();

  try {
    /* ----------------------------
     * admin_users table
     * ---------------------------- */
    await connection.query(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        username VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    /* ----------------------------
     * products table
     * ---------------------------- */
    await connection.query(`
      CREATE TABLE IF NOT EXISTS products (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        category ENUM('interiors','theatre','furniture','decor') NOT NULL,
        description TEXT NOT NULL,
        image VARCHAR(255) NOT NULL,
        badge VARCHAR(100) DEFAULT '',
        is_hidden TINYINT(1) DEFAULT 0,
        display_order INT DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    /* ----------------------------
     * Create default admin user
     * ---------------------------- */
    const [adminRows] = await connection.query<any[]>(
      'SELECT COUNT(*) AS count FROM admin_users WHERE username = ?',
      ['admin']
    );

    if (adminRows[0].count === 0) {
      const hashedPassword = bcrypt.hashSync('admin123', 10);

      await connection.query(
        'INSERT INTO admin_users (username, password_hash) VALUES (?, ?)',
        ['admin', hashedPassword]
      );

      console.log('Default admin user created (admin / admin123)');
    }

    /* ----------------------------
     * Seed products (if empty)
     * ---------------------------- */
    const [productRows] = await connection.query<any[]>(
      'SELECT COUNT(*) AS count FROM products'
    );

    if (productRows[0].count === 0 && Array.isArray(defaultProducts)) {
      for (let i = 0; i < defaultProducts.length; i++) {
        const product = defaultProducts[i];
        if (!product) continue;

        await connection.query(
          `
          INSERT INTO products
          (id, name, category, description, image, badge, is_hidden, display_order)
          VALUES (?, ?, ?, ?, ?, ?, 0, ?)
        `,
          [
            product.id,
            product.name,
            product.category,
            product.description,
            product.image,
            product.badge || '',
            i,
          ]
        );
      }

      console.log(`Seeded ${defaultProducts.length} products`);
    }
  } finally {
    connection.release();
  }
}

/**
 * Run initialization once
 */
initDatabase().catch((err) => {
  console.error('Database initialization failed:', err);
});

/**
 * Export pool for queries
 */
export default pool;
