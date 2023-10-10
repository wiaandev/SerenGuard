import { View, Text, StyleSheet } from 'react-native';
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "react-native-paper";
import { RootStackParamList } from "../types/RootStackParamList";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { GlobalStyles } from "../utils/globals";

type AuthScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Auth">;
};

export default function Auth({ navigation }: AuthScreenProps) {
  return (
    <SafeAreaView style={GlobalStyles.container}>
      <Text style={styles.heading}>SerenGuard</Text>

      <Button mode="contained" onPress={() => navigation.navigate("Register")}>
        Register
      </Button>

      <Button mode="outlined" onPress={() => navigation.navigate("Login")}>
        Login
      </Button>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    heading: {
        fontSize: 24,
        fontWeight: 'bold'
    }
})
