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
import { UserType } from "../types/userTypes";
import { getDb } from "../../config/config";
import { ReportType } from "../types/ReportTypes";
import { uploadToStorage } from "./firebase-storage";

const setDocument = async (ref: any, data: any) => {
  try {
    await setDoc(ref, data);
  } catch (error) {
    console.log("couldn't set document", error);
  }
};

const db = getDb();

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

export const onCreateReport = async ({
  name,
  img,
  crimeType,
  labels,
  uid,
  lat,
  long
}: ReportType) => {
  // Assuming that 'db' is properly initialized and is a reference to your Firestore instance.

  try {
    const userDocRef = doc(db, "users", uid?.toString() || "");

    const userDocSnapshot = await getDoc(userDocRef);

    const reportData = {
      name,
      img: await uploadToStorage(
        img,
        `reportImages/${userDocRef.id}_${Math.floor(Math.random() * 6) + 1}`
      ),
      crimeType,
      labels,
      createdAt: Timestamp.now(),
      uid,
      lat,
      long
    };

    const reportsCollectionRef = collection(db, "reports");
    const newDocRef = doc(reportsCollectionRef);

    await setDoc(newDocRef, reportData);

    console.log("Report Added!");
  } catch (error) {
    console.error("Error adding report for " + uid, error);
  }
};
