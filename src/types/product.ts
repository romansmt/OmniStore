export type StockStatus = "In Stock" | "Low Stock" | "Out of Stock";

export type ProductCategory =
  | "Industrial Hardware"
  | "Electrical Components"
  | "Networking"
  | "Safety Equipment"
  | "Fasteners"
  | "Power Tools";

export interface ProductAttributes {
  [key: string]: string | number;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: ProductCategory;
  price: number;
  stockStatus: StockStatus;
  attributes: ProductAttributes;
  imageUrl: string;
  description: string;
}

export interface ProductFilters {
  categories?: ProductCategory[];
  stockStatus?: StockStatus;
  minPrice?: number;
  maxPrice?: number;
  query?: string;
}
