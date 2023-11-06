import {
  DocumentData,
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
  where,
} from "firebase/firestore";
import { UserType } from "../types/userTypes";
import { getDb } from "../../config/config";
import { ReportType } from "../types/ReportTypes";
import { uploadToStorage } from "./firebase-storage";
import { db } from "../../config/config";

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
  const userRef = doc(db, "users", uid as string);

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

    await setDocument(userRef, userData);
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
  long,
  address,
  neighbourhood,
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
      long,
      address,
      neighbourhood,
    };

    const reportsCollectionRef = collection(db, "reports");
    const newDocRef = doc(reportsCollectionRef);

    await setDoc(newDocRef, reportData);

    return true;
  } catch (error) {
    console.error("Error adding report for " + uid, error);
  }
};

export const getAllReports = async () => {
  const reports: ReportType[] = [];
  try {
    const querySnapshot = await getDocs(collection(db, "reports"));
    querySnapshot.forEach((doc: DocumentData) => {
      reports.push({ ...doc.data(), id: doc.id });
    });
    return reports;
  } catch (error) {
    console.log(error);
    return reports;
  }
};

export const getReportsByArea = async (area: string) => {
  const reports: ReportType[] = [];
  try {
    const querySnapshot = await getDocs(collection(db, "reports"));
    const crimeTypeCounts: any = {};
    querySnapshot.forEach((doc: DocumentData) => {
      console.log(doc.data().crimeType);
      if (area == doc.data().neighbourhood) {
        const data = doc.data();
        reports.push({ ...doc.data(), id: doc.id });

        const crimeType = data.crimeType;

        if (crimeTypeCounts[crimeType]) {
          crimeTypeCounts[crimeType] += 1;
        } else {
          crimeTypeCounts[crimeType] = 1;
        }
      }
    });

    let mostCommonCrime = null;
    let maxCount = 0;

    for (let crime in crimeTypeCounts) {
      if (crimeTypeCounts[crime] > maxCount) {
        mostCommonCrime = crime;
      }
    }
    return { reports, mostCommonCrime, totalReports: reports.length };
  } catch (error) {
    console.log(error);
    return reports;
  }
};

export const getOfficerReports = async (uid: string) => {
  if (!uid) {
    console.error("Invalid uid provided. ", uid);
    return [];
  }

  try {
    const querySnapshot = await getDocs(
      query(collection(db, "reports"), where("uid", "==", uid))
    );
    const reports = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      uid: doc.id,
    }));
    return reports;
  } catch (error) {
    console.error("Error fetching officer reports", error);
    return [];
  }
};
