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
        uid: user.uid
      });
      updateAuthProfile(firstName, lastName);
    }
  );
};

export const updateAuthProfile = (firstName: string, lastName: string) => {
  if(auth.currentUser){

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
    })
  }
};
