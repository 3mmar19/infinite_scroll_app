import { Product } from './types';

//------------------------------------ Categories ----------------------------------
const categories = ['Electronics', 'Clothing', 'Books', 'Home'];

//------------------------------------ Images ----------------------------------
const categoryImages = {
  Electronics: 'https://plus.unsplash.com/premium_photo-1680721575441-18d5a0567269?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2304',
  Clothing: 'https://images.unsplash.com/photo-1604508230015-5a54faf1fa56?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1287',
  Books: 'https://images.unsplash.com/photo-1709639288004-843810cd937b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2722',
  Home: 'https://images.unsplash.com/photo-1645743713154-40248d732695?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1323'
};

//------------------------------------ Generate Products ----------------------------------
export const generateProducts = (): Product[] => {
  const products: Product[] = [];
  
  for (let i = 1; i <= 135; i++) {  // 135 products
    const category = categories[(i - 1) % categories.length]; 
    const rating = Math.floor(Math.random() * 5) + 1; // Random rating 1-5
    products.push({
      id: i,
      name: `${category} Product ${i}`,
      description: `High quality ${category.toLowerCase()} product with great features.`,
      price: Math.floor(Math.random() * 500) + 10, // Random price between 10 and 500
      image: categoryImages[category as keyof typeof categoryImages],
      category: category,
      rating: rating
    });
  }
  
  return products;
};

export const products = generateProducts();
