import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { router } from "expo-router";

import { ThemedText } from "@/presentation/theme/components/ThemedText";
import ThemedTextInput from "@/presentation/theme/components/ThemedTextInput";
import ThemedButton from "@/presentation/theme/components/ThemedButton";
import ThemedLink from "@/presentation/theme/components/ThemedLink";
import { useThemeColor } from "@/presentation/theme/hooks/useThemeColor";
import { useAuthStore } from "@/presentation/auth/store/useAuthStore";

interface RegisterFormData {
  email: string;
  password: string;
  fullName: string;
}

const RegisterData: RegisterFormData = {
  email: "",
  password: "",
  fullName: "",
};

export default function Register() {
  const { register } = useAuthStore();

  const { height } = useWindowDimensions();
  const textColor = useThemeColor({}, "text");
  const backgroundColor = useThemeColor({}, "background");

  const [isPosting, setIsPosting] = useState(false);
  const [formData, setFormData] = useState(RegisterData);

  const onRegister = async () => {
    const { email, password, fullName } = formData;

    if (!email || !password || !fullName) {
      return;
    }

    setIsPosting(true);

    const wasSuccessful = await register(email, password, fullName);

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
          <ThemedText type="title">Crear cuenta</ThemedText>
          <ThemedText style={{ color: "gray" }}>
            Por favor crea una cuenta para continuar
          </ThemedText>
        </View>

        {/* Form */}
        <View
          style={{
            marginTop: 20,
          }}
        >
          <ThemedTextInput
            placeholder="Nombre completo"
            autoCapitalize="words"
            icon="person-outline"
            value={formData.fullName}
            onChangeText={(value) =>
              setFormData({
                ...formData,
                fullName: value,
              })
            }
          />

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
          onPress={onRegister}
          disabled={isPosting}
        >
          Crear cuenta
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
          <Text style={{ color: textColor }}>¿Ya tienes cuenta?</Text>
          <ThemedLink
            href="/auth/login"
            style={{
              marginHorizontal: 5,
            }}
          >
            Ingresar
          </ThemedLink>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
