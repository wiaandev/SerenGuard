import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { GlobalStyles } from "../utils/globals";
import {
  Button,
  Divider,
  IconButton,
  Menu,
  SegmentedButtons,
  TextInput,
} from "react-native-paper";
import { RootStackParamList } from "../types/RootStackParamList";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { colors } from "../utils/colors";
import { PoliceRanks } from "../constants/enums/RankType";
import {
  emailPattern,
  idPattern,
  namePattern,
  passwordPattern,
} from "../utils/regex";
import { onRegisterNewUser } from "../firebase/firebase-auth";

type RegisterProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Register">;
};

const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  officerId: "",
  rank: "",
  password: "",
  confirmPassword: "",
};

export default function Register({ navigation }: RegisterProps) {
  //setting the default state of officer which is the officer sign up screen
  const [value, setValue] = useState<string>("officer");

  //setting the detault values of the form
  const [formVals, setFormVals] = useState(defaultValues);
  const [disableButton, setDisableButton] = useState<boolean>(false);
  //de-structuring the values
  const {
    firstName,
    lastName,
    email,
    officerId,
    rank,
    password,
    confirmPassword,
  } = formVals;

  //error states
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [officerIdError, setOfficerIdError] = useState("");
  const [rankError, setRankError] = useState("");

  // setting these states so I can switch to show and hide passwords
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const [visible, setVisible] = useState(false);
  const [selectedRank, setSelectedRank] = useState("");

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const onRankSelect = (rank: string) => {
    setSelectedRank(rank);
    closeMenu();
  };

  const isFirstNameValid = namePattern.test(firstName);

  console.log(isFirstNameValid);

  const toggleSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const validateInputs = () => {
    console.log("running function");
    if (!firstName.match(namePattern)) {
      setFirstNameError("Invalid First Name");
    }

    if (lastName.length < 1) {
      setLastNameError("Invalid Last Name");
    }
    if (!email.match(emailPattern)) {
      setEmailError("Invalid Email");
    }
    if (!password.match(passwordPattern)) {
      setPasswordError(
        "Password: Min. 6 characters, 1 uppercase, 1 lowercase, 1 symbol."
      );
    } else {
      setPasswordError("");
    }
    if (!officerId.match(idPattern)) {
      setOfficerIdError("Invalid Officer ID");
    }
  };

  // const checkValues = () => {
  //   const emptyVals: boolean =
  //   firstName == "" &&
  //   lastName == "" &&
  //   email == "" &&
  //   officerId == "" &&
  //   rank == "" &&
  //   password == "" &&
  //   confirmPassword == "";
  // setDisableButton(!emptyVals);
  //   return emptyVals;
  // return emptyVals;
  // }

  const registerUser = () => {
    validateInputs();
    onRegisterNewUser({
      firstName: firstName,
      lastName: lastName,
      email: email,
      officerId: officerId,
      isOfficer: officerId ? true : false,
      rank: officerId ? selectedRank : "N/A",
      password: password,
    });
  };

  return (
    <ScrollView bounces={false}>
      <SafeAreaView style={GlobalStyles.container}>
        <Text>Create Your Account</Text>

        <SegmentedButtons
          buttons={[
            {
              value: "officer",
              label: "Officer",
              icon: "police-badge",
              checkedColor: colors.black,
            },
            {
              value: "civilian",
              label: "Civilian",
              icon: "account",
              checkedColor: colors.orange,
            },
          ]}
          value={value}
          onValueChange={setValue}
        />

        <TextInput
          mode="flat"
          label={"Name"}
          error={!firstName.match(namePattern) ? true : false}
          value={firstName}
          autoCapitalize="none"
          onChangeText={(formvalue) =>
            setFormVals({ ...formVals, firstName: formvalue })
          }
        />

        <Text style={{ color: colors.error }}>{firstNameError}</Text>

        <TextInput
          mode="flat"
          label={"Surname"}
          error={
            !lastName.match(namePattern) ? true : false && firstName.length > 1
          }
          value={lastName}
          autoCapitalize="none"
          onChangeText={(formvalue) =>
            setFormVals({ ...formVals, lastName: formvalue })
          }
        />
        <Text style={{ color: colors.error }}>{lastNameError}</Text>

        <TextInput
          mode="flat"
          label={"Email"}
          error={!email.match(emailPattern) && email.length > 2}
          value={email}
          autoCapitalize="none"
          onChangeText={(formvalue) =>
            setFormVals({ ...formVals, email: formvalue })
          }
        />
        <Text style={{ color: colors.error }}>{emailError}</Text>

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
            setFormVals({ ...formVals, password: formvalue })
          }
        />
        <Text style={{ color: colors.error }}>{passwordError}</Text>

        <TextInput
          mode="flat"
          label={"Confirm Password"}
          secureTextEntry={secureTextEntry}
          right={
            <TextInput.Icon
              icon={secureTextEntry ? "eye-off" : "eye"}
              onPress={toggleSecureTextEntry}
            />
          }
          error={password !== confirmPassword}
          value={confirmPassword}
          autoCapitalize="none"
          onChangeText={(formvalue) =>
            setFormVals({ ...formVals, confirmPassword: formvalue })
          }
        />
        {password !== confirmPassword && (
          <Text style={{ color: colors.error }}>password does not match</Text>
        )}

        {value === "officer" && <Divider />}
        {value === "officer" && (
          <>
            <TextInput
              mode="flat"
              label={"Officer Id"}
              error={!officerId.match(idPattern) && officerId.length > 1}
              value={officerId}
              autoCapitalize="none"
              onChangeText={(formvalue) =>
                setFormVals({ ...formVals, officerId: formvalue })
              }
            />
            <Text style={{ color: colors.error }}>{officerIdError}</Text>
          </>
        )}
        {value === "officer" && (
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={<Button onPress={openMenu}>Select Rank</Button>}
          >
            {PoliceRanks.map((rank) => (
              <Menu.Item
                title={rank}
                key={rank}
                onPress={() => onRankSelect(rank)}
              />
            ))}
          </Menu>
        )}

        <Text style={{ color: "red" }}>{selectedRank}</Text>

        <Button
          mode="contained"
          onPress={registerUser}
          disabled={disableButton}
        >
          Create Account
        </Button>

        <IconButton
          icon="google"
          size={20}
          style={{ alignSelf: "center" }}
          onPress={() => console.log("logging in with google")}
        />

        <Button
          mode="text"
          onPress={() => navigation.navigate("Login")}
          elevation={1}
        >
          Go to Login
        </Button>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
