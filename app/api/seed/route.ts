import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// Product data from products copy.ts
const products = [
    {
        id: 101,
        name: "Modular Kitchen",
        category: "interiors",
        description: "High-gloss finish with soft-close drawers",
        badge: "Top Seller",
        onSale: true,
        variants: [
            { name: "Classic White", image: "/assets/Interiors/Design1.webp", color: "#FFFFFF" },
            { name: "Wood Finish", image: "/assets/Interiors/Design3.webp", color: "#8B4513" },
            { name: "Premium Grey", image: "/assets/Interiors/Design5.webp", color: "#6B7280" }
        ]
    },
    {
        id: 102,
        name: "False Ceiling & Lighting",
        category: "interiors",
        description: "POP/Gypsum with modern lighting integration",
        badge: "Trending",
        onSale: false,
        variants: [
            { name: "Modern Design", image: "/assets/Interiors/Design3.webp", color: "#F5F5DC" }
        ]
    },
    {
        id: 103,
        name: "TV Unit & Arch",
        category: "interiors",
        description: "Custom wood and laminate designer units",
        badge: "Trending",
        onSale: true,
        variants: [
            { name: "Contemporary", image: "/assets/Interiors/Design5.webp", color: "#2C3E50" },
            { name: "Minimalist", image: "/assets/Interiors/Design6.webp", color: "#ECF0F1" }
        ]
    },
    {
        id: 104,
        name: "Bedroom Cupboards",
        category: "interiors",
        description: "Floor to ceiling storage solutions",
        badge: "",
        onSale: false,
        variants: [
            { name: "Walnut Brown", image: "/assets/Interiors/Design6.webp", color: "#5D4037" },
            { name: "Pure White", image: "/assets/Interiors/Design8.webp", color: "#FFFFFF" }
        ]
    },
    {
        id: 105,
        name: "Tiles & Granite Work",
        category: "interiors",
        description: "Professional flooring & wall services",
        badge: "Service",
        onSale: false,
        variants: [
            { name: "Premium Finish", image: "/assets/Interiors/Design8.webp", color: "#9E9E9E" }
        ]
    },
    {
        id: 201,
        name: "4K Projector Setup",
        category: "theatre",
        description: "Complete installation with screen calibration",
        badge: "Premium",
        onSale: true,
        variants: [
            { name: "Standard Setup", image: "/assets/Home Theatre/HT1.webp", color: "#1A1A2E" },
            { name: "Premium Setup", image: "/assets/Home Theatre/HT2.webp", color: "#0D0D0D" }
        ]
    },
    {
        id: 202,
        name: "Sound System & Acoustics",
        category: "theatre",
        description: "Dolby Atmos surround sound with sound proofing",
        badge: "",
        onSale: false,
        variants: [
            { name: "5.1 Surround", image: "/assets/Home Theatre/HT2.webp", color: "#333333" },
            { name: "7.1 Atmos", image: "/assets/Home Theatre/HT3.webp", color: "#1A1A1A" }
        ]
    },
    {
        id: 203,
        name: "Theatre Seating",
        category: "theatre",
        description: "Motorized leather recliners with cupholders",
        badge: "Comfort",
        onSale: true,
        variants: [
            { name: "2-Seater", image: "/assets/Home Theatre/HT3.webp", color: "#8B0000" },
            { name: "4-Seater", image: "/assets/Home Theatre/HT4.webp", color: "#000000" }
        ]
    },
    {
        id: 204,
        name: "Complete Home Theatre",
        category: "theatre",
        description: "Full room transformation package",
        badge: "Best Value",
        onSale: true,
        variants: [
            { name: "Standard Package", image: "/assets/Home Theatre/HT4.webp", color: "#2C3E50" },
            { name: "Premium Package", image: "/assets/Home Theatre/HT1.webp", color: "#1A1A2E" }
        ]
    },
    {
        id: 301,
        name: "Premium Sofas",
        category: "furniture",
        description: "Made to order fabric or leather sofas",
        badge: "Best Seller",
        onSale: true,
        variants: [
            { name: "Classic Brown", image: "/assets/Furniture/sofa1.webp", color: "#8B4513" },
            { name: "Modern Grey", image: "/assets/Furniture/sofa2.webp", color: "#696969" },
            { name: "Royal Blue", image: "/assets/Furniture/sofa3.webp", color: "#1E3A5F" },
            { name: "Cream White", image: "/assets/Furniture/sofa4.webp", color: "#FFFDD0" },
            { name: "Charcoal", image: "/assets/Furniture/sofa5.webp", color: "#36454F" }
        ]
    },
    {
        id: 302,
        name: "Designer Recliners",
        category: "furniture",
        description: "Motorized & manual recliner options",
        badge: "Comfort",
        onSale: true,
        variants: [
            { name: "Single Recliner", image: "/assets/Furniture/sofa6.webp", color: "#5D4037" },
            { name: "Double Recliner", image: "/assets/Furniture/sofa7.webp", color: "#3E2723" },
            { name: "Theater Style", image: "/assets/Furniture/sofa8.webp", color: "#212121" }
        ]
    },
    {
        id: 303,
        name: "Sofa Cum Bed",
        category: "furniture",
        description: "Space-saving foldable furniture",
        badge: "Popular",
        onSale: false,
        variants: [
            { name: "Compact", image: "/assets/Furniture/sofa9.webp", color: "#795548" },
            { name: "King Size", image: "/assets/Furniture/sofa10.webp", color: "#4E342E" }
        ]
    },
    {
        id: 304,
        name: "Indoor & Outdoor Jhulas",
        category: "furniture",
        description: "Traditional and modern swings",
        badge: "New",
        onSale: true,
        variants: [
            { name: "Wooden Classic", image: "/assets/Furniture/sofa3.webp", color: "#A1887F" },
            { name: "Metal Modern", image: "/assets/Furniture/sofa4.webp", color: "#607D8B" }
        ]
    },
    {
        id: 401,
        name: "Eyelet Curtains",
        category: "curtains",
        description: "Premium blackout or sheer fabric with smooth eyelet hangings",
        badge: "Best Seller",
        onSale: true,
        variants: [
            { name: "Blackout", image: "/assets/Curtains/Curtain1.webp", color: "#2C3E50" },
            { name: "Sheer White", image: "/assets/Curtains/Curtain2.webp", color: "#FAFAFA" }
        ]
    },
    {
        id: 402,
        name: "Pleated Curtains",
        category: "curtains",
        description: "Elegant pinch pleat curtains for living rooms",
        badge: "",
        onSale: false,
        variants: [
            { name: "Classic Pleat", image: "/assets/Curtains/Curtain2.webp", color: "#D4AF37" },
            { name: "Box Pleat", image: "/assets/Curtains/Curtain3.webp", color: "#C0C0C0" }
        ]
    },
    {
        id: 403,
        name: "Window Blinds",
        category: "curtains",
        description: "Zebra, roller & venetian blinds",
        badge: "Trending",
        onSale: true,
        variants: [
            { name: "Zebra Blinds", image: "/assets/Curtains/Curtain3.webp", color: "#FFFFFF" },
            { name: "Roller Blinds", image: "/assets/Curtains/Curtain4.webp", color: "#E0E0E0" }
        ]
    },
    {
        id: 404,
        name: "Roman Blinds",
        category: "curtains",
        description: "Soft fold blinds for contemporary interiors",
        badge: "",
        onSale: false,
        variants: [
            { name: "Soft Fold", image: "/assets/Curtains/Curtain4.webp", color: "#F5F5DC" }
        ]
    },
];

export const runtime = 'nodejs';

// POST - Seed all products
export async function POST() {
    try {
        const connection = await pool.getConnection();

        try {
            // Clear existing data
            await connection.query('SET FOREIGN_KEY_CHECKS = 0');
            await connection.query('DELETE FROM product_variants');
            await connection.query('DELETE FROM products');

            // Drop old image column if it exists
            try {
                await connection.query('ALTER TABLE products DROP COLUMN image');
                console.log('Dropped old image column');
            } catch (e) {
                // Column doesn't exist, that's fine
            }

            await connection.query('SET FOREIGN_KEY_CHECKS = 1');

            let variantCount = 0;

            // Insert each product and its variants
            for (const product of products) {
                await connection.query(
                    `INSERT INTO products (id, name, category, description, badge, on_sale, is_hidden, display_order)
           VALUES (?, ?, ?, ?, ?, ?, 0, ?)`,
                    [
                        product.id,
                        product.name,
                        product.category,
                        product.description,
                        product.badge || '',
                        product.onSale ? 1 : 0,
                        product.id
                    ]
                );

                for (let i = 0; i < product.variants.length; i++) {
                    const variant = product.variants[i];
                    await connection.query(
                        `INSERT INTO product_variants (product_id, name, image, color, display_order)
             VALUES (?, ?, ?, ?, ?)`,
                        [product.id, variant.name, variant.image, variant.color, i]
                    );
                    variantCount++;
                }
            }

            return NextResponse.json({
                success: true,
                productsSeeded: products.length,
                variantsSeeded: variantCount
            });

        } finally {
            connection.release();
        }
    } catch (error) {
        console.error('Seed error:', error);
        return NextResponse.json({ error: 'Seed failed', details: String(error) }, { status: 500 });
    }
}
