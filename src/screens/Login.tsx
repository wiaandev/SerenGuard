import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { GlobalStyles } from "../utils/globals";
import { Button, IconButton, TextInput } from "react-native-paper";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/RootStackParamList";
import { firebase } from "../../config/config";
import { getAuth } from "firebase/auth";
import { emailPattern, passwordPattern } from "../utils/regex";
import { onSignInUser } from "../firebase/firebase-auth";

type LoginProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Login">;
};

const defaultValues = {
  email: "",
  password: "",
};

export default function Login({ navigation }: LoginProps) {
  const [values, setValues] = useState(defaultValues);
  const { email, password } = values;
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // setting these states so I can switch to show and hide passwords
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const [visible, setVisible] = useState(false);

  const toggleSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  useEffect(() => {
    const subscriber = getAuth().onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("Home");
        setValues(defaultValues);
      }
    });
    return subscriber;
  });

  const login = () => {
    if (email.length == 0 && password === "") {
      setEmailError("Enter an email");
      setPasswordError("Enter a password");
    } else if (!email.match(emailPattern) && !password.match(passwordPattern)) {
      setEmailError("Email is incorrect! Try Again");
      setPasswordError("Password is incorrect! Try again");
    } else {
      onSignInUser(email, password);
    }
  };

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <Text>Welcome Back</Text>
      <Text>Login to your account</Text>

      <TextInput
        mode="flat"
        label={"Email"}
        error={!email.match(emailPattern) && email.length > 2}
        value={email}
        autoCorrect={false}
        autoCapitalize="none"
        onChangeText={(formvalue) => setValues({ ...values, email: formvalue })}
      />

      <TextInput
        mode="flat"
        label={"Password"}
        secureTextEntry={secureTextEntry}
        right={
          <TextInput.Icon
            icon={secureTextEntry ? "eye-off" : "eye"}
            onPress={toggleSecureTextEntry}
          />
        }
        error={!password.match(passwordPattern) && password.length > 1}
        value={password}
        autoCapitalize="none"
        onChangeText={(formvalue) =>
          setValues({ ...values, password: formvalue })
        }
      />

      <Button mode="contained" onPress={login}>
        Login
      </Button>

      <Text style={{ alignSelf: "center" }}>Or Login with</Text>
      <IconButton icon={"google"} style={{ alignSelf: "center" }} />

      <Button mode="text" onPress={() => navigation.navigate("Register")}>
        Go to Register
      </Button>
    </SafeAreaView>
  );
}
