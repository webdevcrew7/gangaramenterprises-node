import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';

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
 * Initialize database schema with variants support
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
     * products table (with curtains category and on_sale)
     * ---------------------------- */
    await connection.query(`
      CREATE TABLE IF NOT EXISTS products (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        category ENUM('interiors','theatre','furniture','curtains') NOT NULL,
        description TEXT NOT NULL,
        badge VARCHAR(100) DEFAULT '',
        on_sale TINYINT(1) DEFAULT 0,
        is_hidden TINYINT(1) DEFAULT 0,
        display_order INT DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    /* ----------------------------
     * product_variants table
     * ---------------------------- */
    await connection.query(`
      CREATE TABLE IF NOT EXISTS product_variants (
        id INT PRIMARY KEY AUTO_INCREMENT,
        product_id INT NOT NULL,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(500) NOT NULL,
        color VARCHAR(20) DEFAULT '#666666',
        display_order INT DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
      )
    `);

    /* ----------------------------
     * Migrate: Add curtains to category ENUM if not exists
     * ---------------------------- */
    try {
      await connection.query(`
        ALTER TABLE products 
        MODIFY COLUMN category ENUM('interiors','theatre','furniture','decor','curtains') NOT NULL
      `);
    } catch (e) {
      // Column may already have the correct enum, ignore error
    }

    /* ----------------------------
     * Migrate: Add on_sale column if not exists
     * ---------------------------- */
    try {
      await connection.query(`
        ALTER TABLE products ADD COLUMN on_sale TINYINT(1) DEFAULT 0 AFTER badge
      `);
    } catch (e) {
      // Column may already exist
    }

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
