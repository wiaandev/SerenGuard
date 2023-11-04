import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { firebase } from "../../config/config";
import { Alert } from "react-native";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { onCreateUserInDb } from "./firebase-db";
import { UserType } from "../types/userTypes";

let auth = getAuth();
let db = getFirestore();

// Add this async function to check if an officerId already exists
const checkIfOfficerIdExists = async (officerId: string) => {
  const usersCollectionRef = collection(db, "users");

  const q = query(usersCollectionRef, where("officerId", "==", officerId));
  const querySnapshot = await getDocs(q);

  return !querySnapshot.empty; // Returns true if officerId already exists, false otherwise
};

//  TODO add validation to check if a officer ID already exists
export const onRegisterNewUser = async ({
  firstName,
  lastName,
  email,
  officerId,
  rank,
  isOfficer,
  password,
}: UserType) => {
  const officerIdExists = await checkIfOfficerIdExists(officerId as string);
  if (!officerIdExists) {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
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
      })
      .catch((error) => {
        console.log("Error creating user: ", error);
        return false;
      });
  }
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

export const checkIsOfficer = async (uid: string) => {
  try {
    const userRef = doc(collection(db, "users"), uid);
    const querySnapShot = await getDoc(userRef);

    if (querySnapShot.exists() && querySnapShot.data().isOfficer) {
      console.log("this user is an officer");
      return true;
    } else {
      console.log("this user is a civilian");
      return false;
    }
  } catch (error) {
    console.log("could not check user type: ", error);
  }
};

export const updateAuthProfile = (firstName: string, lastName: string) => {
  if (auth.currentUser) {
    updateProfile(auth.currentUser, {
      displayName: `${firstName}${lastName.split("").join("")}`,
      photoURL:
        "https://i.pinimg.com/originals/fd/b6/de/fdb6dea1b13458837c6e56361d2c2771.jpg",
    })
      .then(() => {
        console.log("profile has been updated");
      })
      .catch((err) => {
        console.log("Profile update ERROR");
      });
  }
};
