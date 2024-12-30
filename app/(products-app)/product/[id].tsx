import { Ionicons } from "@expo/vector-icons";
import { Redirect, useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";
import { Formik } from "formik";

import ThemedTextInput from "@/presentation/theme/components/ThemedTextInput";
import { ThemedView } from "@/presentation/theme/components/ThemedView";
import { useThemeColor } from "@/presentation/theme/hooks/useThemeColor";
import { useProduct } from "@/presentation/products/hooks/usePrdouct";
import ProductImages from "@/presentation/products/components/product-images";
import ThemedButtonGroup from "@/presentation/theme/components/ThemedButtonGroup";
import ThemedButton from "@/presentation/theme/components/ThemedButton";
import { Size } from "@/core/products/interface/product.interface";

export default function Product() {
  const primaryColor = useThemeColor({}, "primary");

  const { id } = useLocalSearchParams();
  const navigation = useNavigation();

  const { productQuery, productMutation } = useProduct(`${id}`);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Ionicons name="camera-outline" size={26} color={primaryColor} />
      ),
    });
  }, []);

  useEffect(() => {
    if (productQuery.data) {
      navigation.setOptions({
        title: productQuery.data.title,
      });
    }
  }, [productQuery.data]);

  if (productQuery.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={30} />
      </View>
    );
  }

  if (!productQuery.data) {
    return <Redirect href="/(products-app)/(home)" />;
  }

  const product = productQuery.data!;

  return (
    <Formik initialValues={product} onSubmit={productMutation.mutate}>
      {({ values, handleChange, handleSubmit, setFieldValue }) => (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <ScrollView>
            <ProductImages images={product.images} />

            <ThemedView style={{ marginHorizontal: 10, marginTop: 20 }}>
              <ThemedTextInput
                placeholder="Titulo"
                style={{ marginVertical: 5 }}
                value={values.title}
                onChangeText={handleChange("title")}
              />

              <ThemedTextInput
                placeholder="Slug"
                style={{ marginVertical: 5 }}
                value={values.slug}
                onChangeText={handleChange("slug")}
              />

              <ThemedTextInput
                placeholder="Descripción"
                multiline
                numberOfLines={5}
                style={{ marginVertical: 5 }}
                value={values.description}
                onChangeText={handleChange("description")}
              />
            </ThemedView>

            <ThemedView
              style={{
                marginHorizontal: 10,
                marginVertical: 5,
                flexDirection: "row",
                gap: 10,
              }}
            >
              <ThemedTextInput
                placeholder="Precio"
                keyboardType="numeric"
                style={{ flex: 1 }}
                value={values.price.toString()}
                onChangeText={handleChange("price")}
              />

              <ThemedTextInput
                placeholder="Inventario"
                keyboardType="numeric"
                style={{ flex: 1 }}
                value={values.stock.toString()}
                onChangeText={handleChange("stock")}
              />
            </ThemedView>

            <ThemedView style={{ marginHorizontal: 10 }}>
              <ThemedButtonGroup
                options={["XS", "S", "M", "L", "XL", "XXL", "XXXL"]}
                selectedOptions={values.sizes}
                onSelected={(selectedSize) => {
                  const newSizesValue = values.sizes.includes(
                    selectedSize as Size,
                  )
                    ? values.sizes.filter((s) => s !== selectedSize)
                    : [...values.sizes, selectedSize];

                  setFieldValue("sizes", newSizesValue);
                }}
              />

              <ThemedButtonGroup
                options={["kid", "men", "women", "unisex"]}
                selectedOptions={[values.gender]}
                onSelected={(selectedOptions) =>
                  setFieldValue("gender", selectedOptions)
                }
              />
            </ThemedView>

            <View
              style={{
                marginHorizontal: 10,
                marginBottom: 50,
                marginTop: 20,
              }}
            >
              <ThemedButton icon="save-outline" onPress={() => handleSubmit()}>
                Guardar
              </ThemedButton>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
}
