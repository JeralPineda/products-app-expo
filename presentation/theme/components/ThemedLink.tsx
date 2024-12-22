import { Link, LinkProps } from "expo-router";
import { CSSProperties } from "react";
import { Text, View } from "react-native";
import { useThemeColor } from "../hooks/useThemeColor";

interface Props extends LinkProps {}

export default function ThemedLink({ style, ...rest }: Props) {
  const primaryColor = useThemeColor({}, "primary");

  return (
    <Link
      style={[
        {
          color: primaryColor,
        },
        style,
      ]}
      {...rest}
    />
  );
}
