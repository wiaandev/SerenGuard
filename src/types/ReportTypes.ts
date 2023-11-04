import { Timestamp } from "firebase/firestore";

export type ReportType = {
  name: string;
  img: string | null | Object;
  crimeType: string;
  labels: string[];
  uid: string | undefined;
  lat: string;
  long: string;
  address: string | null | undefined;
  neighbourhood: string | null;
  createdAt: Timestamp
};
