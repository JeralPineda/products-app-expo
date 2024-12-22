import { Ionicons } from "@expo/vector-icons";
import { Text, TextInputProps, View } from "react-native";

interface Props extends TextInputProps {
  icon?: keyof typeof Ionicons.glyphMap;
}

export default function ThemedTextInput({ icon, ...rest }: Props) {
  return (
    <View>
      <Text>Text</Text>
    </View>
  );
}
