import { getProductById } from "@/core/products/actions/get-product-by-id.action";
import { useQuery } from "@tanstack/react-query";

export function useProduct(productId: string) {
  const productQuery = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductById(productId),
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  // Mutation

  // Mantener el Id del producto en caso de ser uno nuevo

  return {
    productQuery,
  };
}
