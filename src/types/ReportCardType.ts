import { Timestamp } from "firebase/firestore";

export type ReportCardType = {
  name: string;
  nanoseconds: number;
  img: string;
  labels: string[];
  crimeType: string;
  address: string
};
