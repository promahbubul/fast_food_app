import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { signIn } from "@/lib/appwrite";
import userAuthStore from "@/store/auth.store";
import * as Sentry from "@sentry/react-native";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
const SignIn = () => {
  const { isAuthenticated } = userAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  console.log("Authenticated::", isAuthenticated);

  const submit = async () => {
    const { email, password } = form;
    if (!email || !password)
      return Alert.alert("Error", "Please enter valid email & password");

    setIsSubmitting(true);
    try {
      await signIn({ email, password });
      // console.log(await getCurrentUser());
      Alert.alert("Success", "User sign in successfully");
      router.replace("/");
    } catch (error: any) {
      Alert.alert("Error", error.message);
      Sentry.captureEvent(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <View className="gap-10 bg-white rounded-lg p-5 mt-5">
      <CustomInput
        placeholder="Enter your email"
        value={form.email}
        onChangeText={(text) => setForm((prev) => ({ ...prev, email: text }))}
        label="Email"
        keyboardType="email-address"
      />
      <CustomInput
        placeholder="Enter your password"
        value={form.password}
        onChangeText={(text) =>
          setForm((prev) => ({ ...prev, password: text }))
        }
        label="Password"
        secureTextEntry={true}
      />
      <CustomButton isLoading={isSubmitting} onPress={submit} title="Signin" />
      <View className="flex justify-center flex-row mt-5 gap-2">
        <Text className="base-regular text-gray-100">
          {"Don't"} have an account?
        </Text>
        <Link href={"/sign-up"} className="base-bold text-primary">
          Sign Up
        </Link>
      </View>
    </View>
  );
};
export default SignIn;
const styles = StyleSheet.create({});
