import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

import { ThemedText } from "@/presentation/theme/components/ThemedText";
import ThemedTextInput from "@/presentation/theme/components/ThemedTextInput";
import ThemedButton from "@/presentation/theme/components/ThemedButton";
import ThemedLink from "@/presentation/theme/components/ThemedLink";
import { useThemeColor } from "@/presentation/theme/hooks/useThemeColor";
import { useState } from "react";
import { useAuthStore } from "@/presentation/auth/store/useAuthStore";
import { router } from "expo-router";

interface LoginFormData {
  email: string;
  password: string;
}

const LoginData: LoginFormData = {
  email: "",
  password: "",
};

export default function Login() {
  const { login } = useAuthStore();

  const { height } = useWindowDimensions();
  const textColor = useThemeColor({}, "text");
  const backgroundColor = useThemeColor({}, "background");

  const [isPosting, setIsPosting] = useState(false);
  const [formData, setFormData] = useState(LoginData);

  const onLogin = async () => {
    const { email, password } = formData;

    if (!email || !password) {
      return;
    }

    setIsPosting(true);

    const wasSuccessful = await login(email, password);

    setIsPosting(false);

    if (wasSuccessful) {
      router.replace("/");
      return;
    }

    Alert.alert("Error", "Credenciales incorrectas");
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <ScrollView
        style={{
          paddingHorizontal: 40,
          backgroundColor: backgroundColor,
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
            value={formData.email}
            onChangeText={(value) =>
              setFormData({
                ...formData,
                email: value,
              })
            }
          />

          <ThemedTextInput
            placeholder="Contraseña"
            secureTextEntry
            autoCapitalize="none"
            type="password"
            icon="lock-closed-outline"
            value={formData.password}
            onChangeText={(value) =>
              setFormData({
                ...formData,
                password: value,
              })
            }
          />
        </View>

        {/* Spacer */}
        <View style={{ marginTop: 10 }} />

        {/* Botón */}
        <ThemedButton
          icon="arrow-forward-outline"
          onPress={onLogin}
          disabled={isPosting}
        >
          Ingresar
        </ThemedButton>

        {/* Spacer */}
        <View style={{ marginTop: 50 }} />

        {/* Enlace */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: textColor }}>¿No tienes cuenta?</Text>
          <ThemedLink
            href="/auth/register"
            style={{
              marginHorizontal: 5,
            }}
          >
            Crea cuenta
          </ThemedLink>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
