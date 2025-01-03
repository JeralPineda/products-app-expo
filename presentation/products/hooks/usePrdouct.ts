import { useRef } from "react";
import { Alert } from "react-native";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getProductById } from "@/core/products/actions/get-product-by-id.action";
import { Product } from "@/core/products/interface/product.interface";
import { updateCreateProduct } from "@/core/products/actions/create-update-product.action";
import { useCameraStore } from "@/presentation/store/useCameraStore";

export function useProduct(productId: string) {
  const { clearImages } = useCameraStore();

  const productIdRef = useRef(productId); // "new" or UUID
  const queryClient = useQueryClient();

  const productQuery = useQuery({
    queryKey: ["products", productId],
    queryFn: () => getProductById(productId),
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  const productMutation = useMutation({
    mutationFn: async (data: Product) =>
      updateCreateProduct({
        ...data,
        id: productIdRef.current,
      }),

    onSuccess: (data: Product) => {
      productIdRef.current = data.id;

      clearImages();

      queryClient.invalidateQueries({
        queryKey: ["products", "infinite"],
      });

      queryClient.invalidateQueries({
        queryKey: ["products", data.id],
      });

      Alert.alert("Producto guardado", "El producto se ha guardado");
    },
  });

  return {
    productQuery,
    productMutation,
  };
}
