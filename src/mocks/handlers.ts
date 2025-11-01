import { http, HttpResponse, delay } from 'msw';
import { products } from './data';
import { Product, PaginatedResponse } from './types';

//------------------------------------ Re-export types for convenience ----------------------------------
export type { Product, PaginatedResponse };

export const handlers = [
  //------------------------------------ GET endpoint and parameters from URL ----------------------------------
  http.get('/api/items', async ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const limit = parseInt(url.searchParams.get('limit') || '20', 10);
    const searchQuery = url.searchParams.get('q') || '';
    const categoryFilter = url.searchParams.get('category') || 'All';

    const randomDelay = Math.floor(Math.random() * 700) + 300;  // Random delay between 300ms and 1000ms
    await delay(randomDelay);

    let filteredProducts = products;
    
    //------------------------------------ Filter by category ----------------------------------
    if (categoryFilter && categoryFilter !== 'All') {
      filteredProducts = filteredProducts.filter(product => 
        product.category === categoryFilter
      );
    }
    
    //------------------------------------ after category filter, filter by search query ----------------------------------
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredProducts = filteredProducts.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }

    //------------------------------------ Calculate pagination ----------------------------------
    const total = filteredProducts.length;
    const startIndex = (page - 1) * limit;  // Page 1: 0, Page 2: 20, Page 3: 40
    const endIndex = startIndex + limit;    // Page 1: 20, Page 2: 40, Page 3: 60
    const paginatedItems = filteredProducts.slice(startIndex, endIndex);
    const hasMore = endIndex < total;       // Check if there are more pages

    const response: PaginatedResponse = {
      items: paginatedItems,
      page,
      limit,
      total,
      hasMore
    };

    return HttpResponse.json(response);
  })
];