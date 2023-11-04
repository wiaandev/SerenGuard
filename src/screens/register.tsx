import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Alert,
} from "react-native";
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
import { UserRegistrationData, UserType } from "../types/userTypes";
import { useTheme } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";

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

  // Dropdown states
  const [showMultiSelectDropDown, setShowMultiSelectDropDown] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);

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

  namePattern.test(firstName);

  const toggleSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const validateInputs = () => {
    if (!firstName.match(namePattern)) {
      setFirstNameError("Invalid First Name");
      return false;
    }

    if (lastName.length < 1) {
      setLastNameError("Invalid Last Name");
      return false;
    }
    if (!email.match(emailPattern)) {
      setEmailError("Invalid Email");
      return false;
    }
    if (!password.match(passwordPattern)) {
      setPasswordError(
        "Password: Min. 6 characters, 1 uppercase, 1 lowercase, 1 symbol."
      );
      return false;
    } else {
      setPasswordError("");
    }
    if (!officerId.match(idPattern) && value === "officer") {
      setOfficerIdError("Invalid Officer ID");
      return false;
    }
    if (selectedRank == "" && value === "officer") {
      setRankError("Choose your rank");
      return false;
    }

    return true;
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

  // const registerUser = () => {
  //   validateInputs();
  //   if (
  //     firstName == "" ||
  //     lastName == "" ||
  //     email == "" ||
  //     password == "" ||
  //     confirmPassword == ""
  //   ) {
  //     Alert.alert("Some fields are empty");
  //   } else {
  //     onRegisterNewUser({
  //       firstName: firstName,
  //       lastName: lastName,
  //       email: email,
  //       officerId: officerId,
  //       isOfficer: officerId ? true : false,
  //       rank: officerId ? selectedRank : "N/A",
  //       password: password,
  //     });
  //   }
  // };

  const registerUser = () => {
    const valInputs: any = validateInputs();

    if (!valInputs) {
      return;
    }

    let userRegistrationData: UserRegistrationData = {
      firstName,
      lastName,
      email,
      password,
    };

    if (value === "officer") {
      if (!officerId || !selectedRank) {
        return;
      }

      userRegistrationData = {
        ...userRegistrationData,
        officerId: officerId,
        isOfficer: true,
        selectedRank: selectedRank,
      };
    } else {
      userRegistrationData = {
        ...userRegistrationData,
        isOfficer: false,
        selectedRank: "N/A",
      };
    }

    // Perform specific validation for civilians here (e.g., check if other properties are set)
    if (value !== "officer" && userRegistrationData.isOfficer) {
      Alert.alert("Civilian cannot have Officer ID and Rank");
      return;
    }

    const finalUser: UserType = {
      firstName: userRegistrationData.firstName,
      lastName: userRegistrationData.lastName,
      email: userRegistrationData.email,
      password: userRegistrationData.password,
      officerId: userRegistrationData.officerId || "",
      isOfficer: !!userRegistrationData.isOfficer,
      rank: userRegistrationData.selectedRank,
    };

    if (!onRegisterNewUser) {
      setOfficerIdError("OfficerId already exists");
      Alert.alert("Officer ID already exists");
    }

    onRegisterNewUser(finalUser);
  };

  return (
    <ImageBackground
      source={require("../assets/register-signup-bg.png")}
      style={[GlobalStyles.container, styles.container]}
    >
      <ScrollView bounces={false}>
        <SafeAreaView style={{ gap: 20 }}>
          <Text style={styles.heading}>Create Your Account</Text>

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
                checkedColor: colors.black,
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
            style={{ color: "green" }}
          />

          <Text style={{ color: colors.error }}>{firstNameError}</Text>

          <TextInput
            mode="flat"
            label={"Surname"}
            error={
              !lastName.match(namePattern)
                ? true
                : false && firstName.length > 1
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
            // <Menu
            //   visible={visible}
            //   onDismiss={closeMenu}
            //   anchor={<Button onPress={openMenu}>Select Rank</Button>}
            // >
            //   {PoliceRanks.map((rank) => (
            //     <Menu.Item
            //       title={rank}
            //       key={rank}
            //       onPress={() => onRankSelect(rank)}
            //     />
            //   ))}
            // </Menu>
            <>
              <DropDown
                label={"Rank"}
                mode="flat"
                visible={showMultiSelectDropDown}
                showDropDown={() => setShowMultiSelectDropDown(true)}
                onDismiss={() => setShowMultiSelectDropDown(false)}
                value={selectedRank}
                list={PoliceRanks.map((rank) => ({ label: rank, value: rank }))}
                setValue={setSelectedRank}
                multiSelect={false}
              />
              <Text style={{ color: colors.error }}>{rankError}</Text>
            </>
          )}

          <Button
            mode="contained"
            onPress={registerUser}
            disabled={disableButton}
            style={{ backgroundColor: colors.orange }}
          >
            Create Account
          </Button>

          <Text style={{ alignSelf: "center", color: colors.white }}>Or</Text>
          <Button
            icon={"google"}
            labelStyle={{ color: colors.white }}
            mode="outlined"
            style={{ width: 200, alignSelf: "center" }}
          >
            Register with Google
          </Button>

          <Button
            mode="text"
            onPress={() => navigation.navigate("Login")}
            elevation={1}
            labelStyle={{ color: colors.orange }}
          >
            Go to Login
          </Button>
        </SafeAreaView>
      </ScrollView>
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
  },
});
