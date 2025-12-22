import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary with credentials
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export { cloudinary };

// Helper function to upload image to Cloudinary
export async function uploadToCloudinary(
    buffer: Buffer,
    options?: {
        folder?: string;
        public_id?: string;
    }
): Promise<{ url: string; public_id: string; secure_url: string }> {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: options?.folder || 'gangaram-enterprises',
                public_id: options?.public_id,
                resource_type: 'image',
                transformation: [
                    { quality: 'auto', fetch_format: 'auto' }
                ]
            },
            (error, result) => {
                if (error) {
                    reject(error);
                } else if (result) {
                    resolve({
                        url: result.url,
                        public_id: result.public_id,
                        secure_url: result.secure_url,
                    });
                } else {
                    reject(new Error('Upload failed - no result'));
                }
            }
        );

        uploadStream.end(buffer);
    });
}

// Helper function to delete image from Cloudinary
export async function deleteFromCloudinary(publicId: string): Promise<void> {
    await cloudinary.uploader.destroy(publicId);
}
