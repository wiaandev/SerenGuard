import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
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
import { colors } from "../utils/colors";

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
    <ImageBackground
      source={require("../assets/register-signup-bg.png")}
      style={[GlobalStyles.container, styles.container]}
    >
      <SafeAreaView style={{ gap: 20 }}>
        <Text style={styles.heading}>Welcome Back</Text>
        <Text style={styles.subHeading}>Login to your account</Text>

        <TextInput
          mode="flat"
          label={"Email"}
          error={!email.match(emailPattern) && email.length > 2}
          value={email}
          autoCorrect={false}
          autoCapitalize="none"
          onChangeText={(formvalue) =>
            setValues({ ...values, email: formvalue })
          }
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

        <Text style={{ alignSelf: "center", color: colors.white}}>Or</Text>
        <Button
          icon={"google"}
          labelStyle={{ color: colors.black }}
          mode="outlined"
          style={{ width: 200, alignSelf: 'center' }}
          buttonColor={colors.white}
        >
          Login with Google
        </Button>

        <Button mode="text" onPress={() => navigation.navigate("Register")}>
          Go to register
        </Button>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 28,
    color: colors.white,
    fontWeight: "700",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    justifyContent: "center",
  },
  subHeading: {
    color: colors.white,
    fontSize: 18,
  },
});
