export enum CrimeType {
    Arson = 'Arson',
    Assault = 'Assault',
    Burglary = 'Burglary',
    Hijacking = 'Hijacking',
    HitAndRun = 'Hit and Run',
    IllegalDumping = 'Illegal Dumping',
    SmashandGrab = 'Smash and Grab',
}

export const CrimeTypes: string[] = Object.values(CrimeType);

export interface UserCrimeSelection {
    selectedCrime: CrimeType;
}

export default CrimeType;