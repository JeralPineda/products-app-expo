import { useState } from "react";
import { FlatList, RefreshControl } from "react-native";

import { Product } from "@/core/products/interface/product.interface";
import { ProductCard } from "./product-card";
import { useQueryClient } from "@tanstack/react-query";

interface ProductListProps {
  products: Product[];
  loadNextPage: () => void;
}

export default function ProductList({
  products,
  loadNextPage,
}: ProductListProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const queryClient = useQueryClient();

  const onPullToRefresh = async () => {
    setIsRefreshing(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));
    queryClient.invalidateQueries({
      queryKey: ["products", "infinite"],
    });

    setIsRefreshing(false);
  };

  return (
    <FlatList
      data={products}
      numColumns={2}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ProductCard product={item} />}
      onEndReached={loadNextPage}
      onEndReachedThreshold={0.8}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onPullToRefresh} />
      }
    />
  );
}
