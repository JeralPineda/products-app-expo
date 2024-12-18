import { View } from "react-native";

import { ThemedText } from "@/presentation/theme/components/ThemedText";
import { useThemeColor } from "@/presentation/theme/hooks/useThemeColor";

export default function Home() {
  const primary = useThemeColor({}, "primary");

  return (
    <View style={{ paddingTop: 100, paddingHorizontal: 20 }}>
      <ThemedText style={{ fontFamily: "KanitBold", color: primary }}>
        Home
      </ThemedText>
      <ThemedText style={{ fontFamily: "KanitRegular" }}>Home</ThemedText>
      <ThemedText style={{ fontFamily: "KanitThin" }}>Home</ThemedText>
    </View>
  );
}
