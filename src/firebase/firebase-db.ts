import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { uploadMedia } from "./firebase-storage";
import { UserType } from "../types/userTypes";
import { getDb } from "../../config/config";

const setDocument = async (ref: any, data: any) => {
  try {
    await setDoc(ref, data);
  } catch (error) {
    console.log("couldn't set document", error);
  }
};

// user collection
export const onCreateUserInDb = async ({
  firstName,
  lastName,
  email,
  officerId,
  rank,
  isOfficer,
  uid,
}: UserType) => {
  console.log("running create db function");
  console.log(uid);
  console.log(firstName);
  console.log(lastName);
  console.log(rank);

  const db = getDb();

  const userRef = doc(db, "users", uid as string);
  console.log("passed 1");

  try {
    const userData = {
      firstName,
      lastName,
      email,
      officerId,
      rank,
      isOfficer,
      createdAt: Timestamp.now(),
    };

    if (isOfficer) {
      userData.officerId = officerId;
      userData.rank = rank;
    }
    console.log("BEFORE SET DOCUMENT");

    await setDocument(userRef, userData);
    console.log("end of create db function");
  } catch (error) {
    console.log("couldn't create user in database", error);
  }
};
