import { Medicament } from './Medicament';
import { Symptome } from './Symptome';

export interface Maladie {
    id: number;
    name: string;
    symptomes: Symptome[];
    cures: Medicament[];
}