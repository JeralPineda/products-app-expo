import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useThemeColor } from "@/presentation/theme/hooks/useThemeColor";
import { useAuthStore } from "../store/useAuthStore";

export default function LogoutIconButton() {
  const primaryColor = useThemeColor({}, "primary");
  const { logout } = useAuthStore();

  return (
    <Pressable
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.7 : 1,
          marginRight: 8,
        },
      ]}
      onPress={logout}
    >
      <Ionicons name="log-out-outline" size={24} color={primaryColor} />
    </Pressable>
  );
}
