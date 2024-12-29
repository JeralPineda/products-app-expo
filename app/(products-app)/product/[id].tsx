import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";

import ThemedTextInput from "@/presentation/theme/components/ThemedTextInput";
import { ThemedView } from "@/presentation/theme/components/ThemedView";
import { useThemeColor } from "@/presentation/theme/hooks/useThemeColor";

export default function Product() {
  const navigation = useNavigation();
  const primaryColor = useThemeColor({}, "primary");

  useEffect(() => {
    // TODO: Colocar el nombre del producto en el header

    navigation.setOptions({
      headerRight: () => (
        <Ionicons name="camera-outline" size={26} color={primaryColor} />
      ),
    });
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView>
        {/* TODO: Product images */}

        <ThemedView style={{ marginHorizontal: 10, marginTop: 20 }}>
          <ThemedTextInput placeholder="Titulo" style={{ marginVertical: 5 }} />

          <ThemedTextInput placeholder="Slug" style={{ marginVertical: 5 }} />

          <ThemedTextInput
            placeholder="Descripción"
            multiline
            numberOfLines={5}
            style={{ marginVertical: 5 }}
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
          />

          <ThemedTextInput
            placeholder="Inventario"
            keyboardType="numeric"
            style={{ flex: 1 }}
          />
        </ThemedView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
