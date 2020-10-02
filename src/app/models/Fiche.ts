import { Symptome } from './Symptome';
import { User } from './User';

export class Fiche{
    id: number;
    patient: User = new User();
    medecin: User = new User();
    etat: number;
    symptomes: Symptome[];
    dateFiche: Date;
}