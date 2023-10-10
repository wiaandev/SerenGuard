import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { GlobalStyles } from "../utils/globals";
import { Button, IconButton, TextInput } from "react-native-paper";
import { RootStackParamList } from "../types/RootStackParamList";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { colors } from "../utils/colors";

type RegisterProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Register">;
};

export default function Register({ navigation }: RegisterProps) {
  return (
    <SafeAreaView style={GlobalStyles.container}>
      <Text>Create Your Account</Text>

      <TextInput mode="outlined" label={"Name"} />
      <TextInput mode="outlined" label={"Surname"} />
      <TextInput mode="outlined" label={"Email"} />
      <TextInput mode="outlined" label={"Password"} secureTextEntry />

      <Button mode="contained" onPress={() => navigation.navigate("ImageTest")}>Create Account</Button>

      <IconButton
        icon="google"
        size={20}
        style={{alignSelf: 'center'}}
        onPress={() => console.log("logging in with google")}
      />

      <Button mode="text" onPress={() => navigation.navigate("Login")}>
        Go to Login
      </Button>
    </SafeAreaView>
  );
} 
