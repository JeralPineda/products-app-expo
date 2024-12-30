import { Alert } from "react-native";
import { useMutation, useQuery } from "@tanstack/react-query";

import { getProductById } from "@/core/products/actions/get-product-by-id.action";
import { Product } from "@/core/products/interface/product.interface";

export function useProduct(productId: string) {
  const productQuery = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductById(productId),
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  const productMutation = useMutation({
    mutationFn: async (data: Product) => {
      // TODO: disparar la acción de crear un producto
      console.log("🚀 usePrdouct.ts -> #15 ~", JSON.stringify(data, null, 2));

      return data;
    },
    onSuccess: (data: Product) => {
      // TODO: invalidar el cache del producto

      Alert.alert("Producto guardado", "El producto se ha guardado");
    },
  });

  // Mantener el Id del producto en caso de ser uno nuevo

  return {
    productQuery,
    productMutation,
  };
}
