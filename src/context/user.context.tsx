import { createContext, useState, useLayoutEffect, useEffect } from "react";
import { getCurrentUser } from "../firebase/firebase-auth";
import { User } from "firebase/auth";

export const UserContext = createContext<any>({});

export const UserProvider = ({ children }: any) => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>();

  const getCurrentSignedInUser = () => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setLoggedInUser(currentUser);
    } else {
      console.log("NO USER FOUND IN CONTEXT");
    }
  };

  useEffect(() => {
    getCurrentSignedInUser();
  }, []);

  return (
    <UserContext.Provider
      value={{ loggedInUser, setLoggedInUser, getCurrentSignedInUser }}
    >
      {children}
    </UserContext.Provider>
  );
};
