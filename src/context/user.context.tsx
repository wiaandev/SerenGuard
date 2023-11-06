import { createContext, useState, useLayoutEffect, useEffect } from "react";
import { getCurrentUser } from "../firebase/firebase-auth";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const UserContext = createContext<any>({});

export const UserProvider = ({ children }: any) => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>();
  const [onboarded, setOnboarded] = useState<string>();
  // const [userInfo, setUserInfo] = useState<any>();
  // const auth = getAuth();

  const getCurrentSignedInUser = () => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setLoggedInUser(currentUser);
    } else {
      console.log("NO USER FOUND IN CONTEXT");
    }
  };

  const getStorage = async () => {
    const onboarded = await AsyncStorage.getItem("onboarded");
    setOnboarded(JSON.parse(onboarded as string));
    console.log("ARE YOU ONBOARDED? ", onboarded);
  };

  useEffect(() => {
    getCurrentSignedInUser();
    getStorage();
  }, []);

  return (
    <UserContext.Provider
      value={{
        loggedInUser,
        setLoggedInUser,
        getCurrentSignedInUser,
        onboarded
        // userInfo,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
