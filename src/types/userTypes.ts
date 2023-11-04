
export type UserType = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    officerId?: string;
    rank?: string;
    isOfficer: boolean;
    uid?: string;
}

export interface UserRegistrationData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    officerId?: string; // Add optional property for officerId
    isOfficer?: boolean;
    selectedRank?: string;
}