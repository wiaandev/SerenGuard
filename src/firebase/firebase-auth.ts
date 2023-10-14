import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { firebase } from "../../config/config";
import { Alert } from "react-native";
import { collection, doc, getDoc } from "firebase/firestore";
import { onCreateUserInDb } from "./firebase-db";
import { UserType } from "../types/userTypes";

let auth = getAuth();

export const onRegisterNewUser = ({
  firstName,
  lastName,
  email,
  officerId,
  rank,
  isOfficer,
  password,
}: UserType) => {
  createUserWithEmailAndPassword(auth, email, password).then(
    async (userCredential) => {
      const user = userCredential.user;
      console.log(user);
      await onCreateUserInDb({
        firstName,
        lastName,
        email,
        password,
        officerId,
        rank,
        isOfficer,
        uid: user.uid,
      });
      updateAuthProfile(firstName, lastName);
    }
  );
};

export const onSignInUser = async (email: string, password: string) => {
  //do some things
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
    })
    .catch((err) => {
      const errorCode = err.code;
      const errorMessage = err.message;
      console.log(errorCode + ": " + errorMessage);

      Alert.alert(errorCode);
    });
};

//  Sign Out Functionality
export const onLogOut = () => {
  signOut(auth)
    .then(() => {
      console.log("Logged out");
    })
    .catch((err) => {
      console.log(err.errorMessage);
    });
};

// Returns the currently logged in user
export const getCurrentUser = () => {
  console.log(auth.currentUser + "THIS IS THE USER");
  return auth.currentUser;
};

export const updateAuthProfile = (firstName: string, lastName: string) => {
  if (auth.currentUser) {
    updateProfile(auth.currentUser, {
      displayName: `${firstName}${lastName}`,
      photoURL:
        "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png",
    })
      .then(() => {
        console.log("profile has been updated");
      })
      .catch((err) => {
        console.log("Profile update ERROR");
      });
  }
};
