import { Timestamp } from "firebase/firestore";


export type ReportCardType = {
  name: string;
  nanoseconds: number;
  img: string;
  labels: labelsArray[];
  crimeType: string;
  address: string
};

type labelsArray = {
  description: string
}