import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useThemeColor } from "../hooks/useThemeColor";

interface ThemedButtonGroupProps {
  options: string[];
  selectedOptions: string[];

  onSelected: (option: string) => void;
}

export default function ThemedButtonGroup({
  options,
  selectedOptions,
  onSelected,
}: ThemedButtonGroupProps) {
  const primaryColor = useThemeColor({}, "primary");

  return (
    <View style={styles.container}>
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          onPress={() => onSelected(option)}
          style={[
            styles.button,
            selectedOptions.includes(option) && {
              backgroundColor: primaryColor,
            },
          ]}
        >
          <Text
            adjustsFontSizeToFit
            numberOfLines={1}
            style={[
              styles.buttonText,
              selectedOptions.includes(option) && styles.selectedButtonText,
            ]}
          >
            {option[0].toUpperCase() + option.slice(1)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  button: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  buttonText: {
    fontSize: 16,
  },
  selectedButtonText: {
    color: "#fff",
  },
});
