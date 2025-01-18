import { createClient } from '@sanity/client';
import axios from 'axios';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

// Load environment variables from .env.local
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

// Create Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
  apiVersion: '2021-08-31',
});

// Function to upload image to Sanity
async function uploadImageToSanity(imageUrl) {
  try {
    console.log(`Uploading image: ${imageUrl}`);
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data);

    const asset = await client.assets.upload('image', buffer, {
      filename: imageUrl.split('/').pop(),
    });

    console.log(`Image uploaded successfully: ${asset._id}`);
    return asset._id;
  } catch (error) {
    console.error(`Failed to upload image: ${imageUrl}`, error.message);
    return null;
  }
}

// Main function to import data into Sanity
async function importData() {
  try {
    console.log('Fetching products from API...');
    const response = await axios.get('https://template1-neon-nu.vercel.app/api/products');
    const products = response.data;

    console.log(`Fetched ${products.length} products`);

    for (const product of products) {
      console.log(`Processing product: ${product.name}`);

      // Upload product image to Sanity
      let imageRef = null;
      if (product.imageUrl) {
        imageRef = await uploadImageToSanity(product.imageUrl);
      }

      // Prepare product data for Sanity
      const sanityProduct = {
        _type: 'product',
        name: product.name,
        description: product.description,
        price: product.price,
        discountPercent: product.discountPercent,
        tags: product.category ? [product.category] : [],
        sizes: product.sizes || [], // Include sizes
        colors: product.colors || [], // Include colors
        isNew: product.isNew || false, // Include isNew flag
        image: imageRef
          ? {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: imageRef,
            },
          }
          : undefined,
      };

      console.log('Uploading product to Sanity:', sanityProduct.name);

      // Upload product data to Sanity
      const result = await client.create(sanityProduct);
      console.log(`Product uploaded successfully: ${result._id}`);
    }

    console.log('Data import completed successfully!');
  } catch (error) {
    console.error('Error importing data:', error.message);
  }
}

// Execute the import
importData();
