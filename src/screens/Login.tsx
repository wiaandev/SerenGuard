import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { GlobalStyles } from "../utils/globals";
import { Button, IconButton, TextInput } from "react-native-paper";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/RootStackParamList";

type LoginProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, "Login">;
  };

export default function Login({navigation}: LoginProps) {
  return (
    <SafeAreaView style={GlobalStyles.container}>
      <Text>Welcome Back</Text>
      <Text>Login to your account</Text>

      <TextInput label={"Username"} />
      <TextInput label={"Password"} />

      <Button mode="contained" onPress={() => navigation.navigate("ImageTest")}>Login</Button>

      <Text style={{ alignSelf: "center" }}>Or Login with</Text>
      <IconButton icon={"google"} style={{ alignSelf: "center" }} />

      <Button mode="text" onPress={() => navigation.navigate("Register")}>Go to Register</Button>
    </SafeAreaView>
  );
}
