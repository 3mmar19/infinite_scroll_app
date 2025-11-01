//------------------------------------ Product Type ----------------------------------
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
}

//------------------------------------ API Response Type ----------------------------------
export interface PaginatedResponse {
  items: Product[];
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
}
