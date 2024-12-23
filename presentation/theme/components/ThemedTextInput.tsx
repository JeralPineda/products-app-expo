import { useRef, useState } from "react";
import {
  Platform,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useThemeColor } from "../hooks/useThemeColor";

interface Props extends TextInputProps {
  icon?: keyof typeof Ionicons.glyphMap;
  type?: "text" | "password";
}

const isAndroid = Platform.OS === "android";

export default function ThemedTextInput({
  type = "text",
  icon,
  secureTextEntry,
  ...rest
}: Props) {
  const primaryColor = useThemeColor({}, "primary");
  const textColor = useThemeColor({}, "text");

  const [showPassword, setShowPassword] = useState(secureTextEntry);
  const [isActive, setIsActive] = useState(false);

  const inputRef = useRef<TextInput>(null);

  return (
    <View
      style={{
        ...styles.container,
        borderColor: isActive ? primaryColor : "#cccccc",
      }}
      onTouchStart={() => inputRef.current?.focus()}
    >
      {icon && (
        <View>
          <Ionicons name={icon} size={24} color={textColor} />
        </View>
      )}

      <TextInput
        ref={inputRef}
        placeholderTextColor="#5c5c5c"
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
        secureTextEntry={type === "password" ? showPassword : false}
        {...rest}
        style={{
          ...styles.input,
          color: textColor,
        }}
      />

      {type === "password" && (
        <View style={styles.showPassword}>
          <Ionicons
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            size={24}
            color={textColor}
            onPress={() => setShowPassword(!showPassword)}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 5,
    gap: 10,
    padding: isAndroid ? 6 : 12,
  },
  input: {
    flex: 1,
  },
  showPassword: {
    justifyContent: "center",
    alignItems: "center",
    borderBottomEndRadius: 10,
  },
});
