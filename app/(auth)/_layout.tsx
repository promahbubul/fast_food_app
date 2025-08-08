import { images } from "@/constants";
import userAuthStore from "@/store/auth.store";
import { Redirect, Slot } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";

const AuthLayout = () => {
  const { isAuthenticated, isLoading } = userAuthStore();

  if (isLoading) return null; // Wait until auth state is loaded1
  if (isAuthenticated) return <Redirect href="/" />;
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        className="bg-white h-[100vh]"
        keyboardShouldPersistTaps={"handled"}
      >
        <View
          className="w-full relative"
          style={{ height: Dimensions.get("screen").height / 2.25 }}
        >
          <ImageBackground
            source={images.loginGraphic}
            className={"size-full rounded-b-lg"}
            resizeMode={"stretch"}
          />
          <Image
            source={images.logo}
            className={"size-48 absolute -bottom-16 self-center z-10"}
          />
        </View>
        <Slot />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
export default AuthLayout;
