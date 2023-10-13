export enum PoliceRank {
    Colonel = 'Colonel',
    LieutenantColonel = 'Lieutenant Colonel',
    Major = 'Major',
    Captain = 'Captain',
    WarrantOfficer = 'Warrant Officer',
    Sergeant = 'Sergeant',
    Constable = 'Constable',
    Lieutenant = 'Lieutenant',
}

export const PoliceRanks: string[] = Object.values(PoliceRank);

export interface UserRankSelection {
    selectedRank: PoliceRank;
}

export default PoliceRank;