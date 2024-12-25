import { Product } from "@/core/products/interface/product.interface";
import { FlatList, Text, View } from "react-native";
import { ProductCard } from "./product-card";

interface ProductListProps {
  products: Product[];
  loadNextPage: () => void;
}

export default function ProductList({
  products,
  loadNextPage,
}: ProductListProps) {
  return (
    <FlatList
      data={products}
      numColumns={2}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ProductCard product={item} />}
      showsVerticalScrollIndicator={false}
    />
  );
}
