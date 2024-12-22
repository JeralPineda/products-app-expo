import {
  KeyboardAvoidingView,
  ScrollView,
  useWindowDimensions,
  View,
} from "react-native";

import { ThemedText } from "@/presentation/theme/components/ThemedText";
import ThemedTextInput from "@/presentation/theme/components/ThemedTextInput";

export default function Login() {
  const { height } = useWindowDimensions();

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <ScrollView
        style={{
          paddingHorizontal: 40,
        }}
      >
        <View
          style={{
            paddingTop: height * 0.35,
          }}
        >
          <ThemedText type="title">Ingresar</ThemedText>
          <ThemedText style={{ color: "gray" }}>
            Por favor ingrese para continuar
          </ThemedText>
        </View>

        {/* Form */}
        <View
          style={{
            marginTop: 20,
          }}
        >
          <ThemedTextInput
            placeholder="Correo"
            keyboardType="email-address"
            autoCapitalize="none"
            icon="mail-outline"
          />

          <ThemedTextInput
            placeholder="Contraseña"
            secureTextEntry
            autoCapitalize="none"
            icon="lock-closed-outline"
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
