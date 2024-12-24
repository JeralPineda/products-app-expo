import { API_URL, productsApi } from "@/core/api/productsApi";
import { type Product } from "../interface/product.interface";

export const getProducts = async (
  limit: number = 20,
  offset: number = 0,
): Promise<Product[]> => {
  try {
    const { data } = await productsApi.get<Product[]>("/products", {
      params: {
        limit,
        offset,
      },
    });

    return data.map((product) => ({
      ...product,
      images: product.images.map((image) => `${API_URL}${image}`),
    }));
  } catch (error) {
    throw new Error("Unable to load products");
  }
};
