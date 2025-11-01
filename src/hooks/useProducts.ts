
//------------------------------------ Import useInfiniteQuery from TanStack Query ----------------------------------
import { useInfiniteQuery } from '@tanstack/react-query';
import { PaginatedResponse } from '../mocks/types';

let isRetrying = false;

//------------------------------------ Fetch function that receives pageParam from React Query ----------------------------------
const fetchProducts = async ({ 
  pageParam, 
  searchQuery = '', 
  category = 'All' 
}: { 
  pageParam: number; 
  searchQuery?: string; 
  category?: string;
}): Promise<PaginatedResponse> => {
  //------------------------------------ Simulate error after page 2 ----------------------------------
  if (pageParam > 2 && !isRetrying && !searchQuery && category === 'All') {
    throw new Error('Network error: Failed to load more products');
  }
  
  //------------------------------------ Build URL with parameters ----------------------------------
  const params = new URLSearchParams({
    page: pageParam.toString(),
    limit: '20',
  });
  
  if (searchQuery) {
    params.append('q', searchQuery);
  }
  
  if (category && category !== 'All') {
    params.append('category', category);
  }
  
  //------------------------------------ Fetch from API ----------------------------------
  const url = `/api/items?${params.toString()}`;
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  
  return response.json();
};

//------------------------------------ useInfiniteQuery Hook (Official TanStack Pattern) ----------------------------------
export const useProducts = (searchQuery: string = '', category: string = 'All') => {
  return useInfiniteQuery({
    queryKey: ['products', category, searchQuery],
    queryFn: ({ pageParam }) => fetchProducts({ pageParam, searchQuery, category }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      // Return next page number if more data exists, otherwise undefined
      return lastPage.hasMore ? lastPage.page + 1 : undefined;
    },
  });
};

//------------------------------------ For Error Retry ----------------------------------
export const triggerRetry = () => {
  isRetrying = true;
};
