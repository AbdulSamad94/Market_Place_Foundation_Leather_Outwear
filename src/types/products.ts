export interface Product {
  _id: string; // Matches `_id` from GROQ
  name: string; // Matches `name` from GROQ
  slug: {
    current: string
  }
  description: string; // Matches `description` from GROQ
  price: number; // Matches `price` from GROQ
  discountPercent: number; // Matches `discountPercent` from GROQ
  tags: string[]; // Matches `tags[]` from GROQ
  sizes: string[]; // Matches `sizes[]` from GROQ
  colors: string[]; // Matches `colors[]` from GROQ
  isNew: boolean; // Matches `isNew` from GROQ
  imageUrl: string; // Matches `"imageUrl": image.asset->url` from GROQ
}
