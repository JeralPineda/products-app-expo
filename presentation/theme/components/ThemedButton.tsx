import { Ionicons } from "@expo/vector-icons";
import { Pressable, PressableProps, StyleSheet, Text } from "react-native";

import { useThemeColor } from "../hooks/useThemeColor";

interface Props extends PressableProps {
  children: string;
  icon?: keyof typeof Ionicons.glyphMap;
}

export default function ThemedButton({ children, icon, ...rest }: Props) {
  const primaryColor = useThemeColor({}, "primary");

  return (
    <Pressable
      {...rest}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? primaryColor + "90" : primaryColor,
        },
        styles.button,
      ]}
    >
      <Text style={styles.text}>{children}</Text>

      {icon && (
        <Ionicons
          name={icon}
          size={24}
          color="white"
          style={{
            marginRight: 5,
          }}
        />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  text: {
    color: "white",
  },
});
