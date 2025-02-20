export interface Product {
  _id: string;
  name: string;
  slug: {
    current: string
  }
  description: string;
  price: number;
  discountPercent: number;
  tags: string[];
  sizes: string[];
  colors: string[];
  isNew: boolean;
  imageUrl: string;
}
