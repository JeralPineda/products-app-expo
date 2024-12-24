import { useInfiniteQuery } from "@tanstack/react-query";

import { getProducts } from "@/core/products/actions/get-products.action";

export function useProducts() {
  const productsQuery = useInfiniteQuery({
    queryKey: ["products", "infinite"],
    queryFn: ({ pageParam }) => getProducts(20, pageParam * 20),

    staleTime: 1000 * 60 * 60, // 1 hour
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => allPages.length,
  });

  return {
    productsQuery,

    loadNextPage: productsQuery.fetchNextPage,
  };
}
