import { createYoga, createSchema } from 'graphql-yoga';
import DataLoader from 'dataloader';
import pool from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

// 1. Define GraphQL Schema (Type definitions)
const typeDefs = /* GraphQL */ `
  type VariantImage {
    id: ID!
    imageUrl: String!
    displayOrder: Int
  }

  type ProductVariant {
    id: ID!
    name: String!
    image: String!
    images: [String!]!
    galleryImages: [VariantImage!]!
    color: String!
  }

  type Product {
    id: ID!
    name: String!
    category: String!
    description: String!
    badge: String
    onSale: Boolean!
    variants: [ProductVariant!]!
  }

  type Category {
    id: ID!
    slug: String!
    name: String!
    icon: String!
    image: String
    displayOrder: Int
  }

  type Query {
    products(category: String, onSale: Boolean): [Product!]!
    product(id: ID!): Product
    categories: [Category!]!
  }
`;

// 2. Setup DataLoader factories per request context
// Why? DataLoader must be instantiated per-request to prevent caching stale data across different users/requests
function createLoaders() {
  const variantLoader = new DataLoader(async (productIds: readonly number[]) => {
    const [rows]: any = await pool.query(
      'SELECT id, product_id, name, image, color, display_order FROM product_variants WHERE product_id IN (?) ORDER BY display_order ASC, id ASC',
      [productIds]
    );
    // Map variants back in the exact order of requested productIds
    return productIds.map(productId =>
      rows.filter((r: any) => r.product_id === productId)
    );
  });

  const imageLoader = new DataLoader(async (variantIds: readonly number[]) => {
    const [rows]: any = await pool.query(
      'SELECT id, variant_id, image_url, display_order FROM variant_images WHERE variant_id IN (?) ORDER BY display_order ASC, id ASC',
      [variantIds]
    );
    return variantIds.map(variantId =>
      rows.filter((r: any) => r.variant_id === variantId)
    );
  });

  return { variantLoader, imageLoader };
}

// 3. Define GraphQL Resolvers
const resolvers = {
  Query: {
    products: async (_parent: any, args: { category?: string; onSale?: boolean }) => {
      let query = 'SELECT id, name, category, description, badge, on_sale, display_order FROM products WHERE is_hidden = 0';
      const params: any[] = [];

      if (args.category && args.category !== 'all') {
        query += ' AND category = ?';
        params.push(args.category);
      }

      if (args.onSale !== undefined) {
        query += ' AND on_sale = ?';
        params.push(args.onSale ? 1 : 0);
      }

      query += ' ORDER BY display_order ASC, id ASC';
      const [rows]: any = await pool.query(query, params);

      return rows.map((p: any) => ({
        id: p.id,
        name: p.name,
        category: p.category,
        description: p.description,
        badge: p.badge || null,
        onSale: p.on_sale === 1,
        // _raw DB id passed down so child DataLoader resolvers can batch on it
        _dbId: p.id,
      }));
    },

    product: async (_parent: any, { id }: { id: string }) => {
      const [rows]: any = await pool.query(
        'SELECT id, name, category, description, badge, on_sale, display_order FROM products WHERE id = ? AND is_hidden = 0',
        [id]
      );
      if (!rows.length) return null;
      const p = rows[0];
      return {
        id: p.id,
        name: p.name,
        category: p.category,
        description: p.description,
        badge: p.badge || null,
        onSale: p.on_sale === 1,
        _dbId: p.id,
      };
    },

    categories: async () => {
      const [rows]: any = await pool.query(
        'SELECT id, slug, name, icon, display_order FROM categories WHERE is_active = 1 ORDER BY display_order ASC'
      );
      return rows.map((c: any) => ({
        id: c.id,
        slug: c.slug,
        name: c.name,
        icon: c.icon || 'fa-folder',
        image: null,
        displayOrder: c.display_order,
      }));
    },
  },

  Product: {
    // Only executed if the GraphQL query requests `variants`!
    variants: async (parent: any, _args: any, context: { loaders: ReturnType<typeof createLoaders> }) => {
      const rawVariants = await context.loaders.variantLoader.load(parent._dbId);
      return rawVariants.map((v: any) => ({
        id: `${parent.id}-${v.id}`,
        name: v.name,
        image: v.image,
        color: v.color || '#666666',
        _dbId: v.id,
        _primaryImage: v.image,
      }));
    },
  },

  ProductVariant: {
    // Only executed if the GraphQL query requests `images` or `galleryImages`!
    images: async (parent: any, _args: any, context: { loaders: ReturnType<typeof createLoaders> }) => {
      const galleryRows = await context.loaders.imageLoader.load(parent._dbId);
      const additional = galleryRows.map((r: any) => r.image_url);
      return additional.length > 0 ? [parent._primaryImage, ...additional] : [parent._primaryImage];
    },

    galleryImages: async (parent: any, _args: any, context: { loaders: ReturnType<typeof createLoaders> }) => {
      const galleryRows = await context.loaders.imageLoader.load(parent._dbId);
      return galleryRows.map((r: any) => ({
        id: r.id,
        imageUrl: r.image_url,
        displayOrder: r.display_order,
      }));
    },
  },
};

// 4. Create Yoga Instance
const yoga = createYoga<{ loaders: ReturnType<typeof createLoaders> }>({
  schema: createSchema({ typeDefs, resolvers }),
  graphqlEndpoint: '/api/graphql',
  fetchAPI: { Response },
  context: () => ({
    loaders: createLoaders(),
  }),
});

// 5. Next.js App Router Route Handlers
export async function GET(request: NextRequest) {
  return yoga.handleRequest(request, { loaders: createLoaders() });
}

export async function POST(request: NextRequest) {
  return yoga.handleRequest(request, { loaders: createLoaders() });
}
