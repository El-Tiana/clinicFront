import { Maladie } from './Maladie';
import { Medicament } from './Medicament';
import { Symptome } from './Symptome';

export class Ordonnance{
    id: number;
    patient: {id:number,username:string};
    medecin: {id:number,username:string,email: string};
    maladie: Maladie;
    medicaments: Medicament[];
    etat: number;
    symptomes: Symptome[];
    idFiche: number;
}