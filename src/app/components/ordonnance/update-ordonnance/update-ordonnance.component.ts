import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Maladie } from 'src/app/models/Maladie';
import { Ordonnance } from 'src/app/models/Ordonnance';
import { OrdonnanceService } from 'src/app/services/ordonnance/ordonnance.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MaladieService } from 'src/app/services/maladie/maladie.service';
import { TokenStorageService } from 'src/app/services/auth/token-storage.service';
import { Medicament } from 'src/app/models/Medicament';
import { MedicamentService } from 'src/app/services/medicament/medicament.service';
import { FicheService } from 'src/app/services/fiche/fiche.service';

@Component({
  selector: 'app-update-ordonnance',
  templateUrl: './update-ordonnance.component.html',
  styleUrls: ['./update-ordonnance.component.css']
})
export class UpdateOrdonnanceComponent implements OnInit {

  form: FormGroup;
  listemaladies: Maladie[];
  listemedicaments: Medicament[];
  formMaladie: FormGroup;
  formMedicament: FormGroup;
  isDoctor = false;
  isLoggedIn = false;
  private roles: string[];
  ordonnance: Ordonnance;
  user: any;
  id:number;
  arrayIds:number[];
  maladiesPossibles:Maladie[]=[];
  medicamentsPossibles: Medicament[]= [];
  trouveDiagno = false;

  constructor(private ordonnanceService: OrdonnanceService,
    private router: Router,
    private symptomeService: MaladieService,
    private tokenStorageService: TokenStorageService,
    private route: ActivatedRoute,
    private medicamentService: MedicamentService,
    private ficheService: FicheService
  ) {
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {    
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.isDoctor = this.roles.includes('ROLE_DOCTOR');
      this.user = user;
    }
    if (this.isDoctor) {
      this.getAllMaladies();
      this.getAllMedicaments();
      console.log("apres getallmaladies");
      this.getById();
      console.log(this.ordonnance);
      //this.getDiagnosedMaladie();
      
    }else{
      this.router.navigateByUrl('login');
    }
    this.form = new FormGroup({
      maladie: new FormControl('', [Validators.required]),
      medicaments: new FormControl('', [Validators.required]),
      remarques: new FormControl('')
    });
    this.formMaladie = new FormGroup({
      name: new FormControl('', [Validators.required])
    });
    this.formMedicament = new FormGroup({
      name: new FormControl('', [Validators.required])
    })
  }

  get f() {
    return this.form.controls;
  }
  getById() {
    this.id = this.route.snapshot.params['id'];
    this.ordonnanceService.get(this.id).subscribe((data: Ordonnance) => {
      this.ordonnance = data;
      console.log(this.ordonnance);
      this.getDiagnosedMaladie();
    });
  }
  fetchOrdonnance(){
    this.ordonnance.maladie = this.form.value.maladie;
    this.ordonnance.medicaments = this.form.value.medicaments;
  }
  submitForm() {
    this.fetchOrdonnance();
    this.ordonnance.etat = 1;
    console.log(this.ordonnance);
    this.ordonnanceService.update(this.id,this.ordonnance).subscribe(res => {
      console.log('Ordonnance modifiee avec succes!');
      this.ficheService.resoudre(this.ordonnance.idFiche,2).subscribe(res => {
        console.log('Fiche resolue avec succes!');
        this.router.navigateByUrl('ordonnances');
      })
    })
  }
  submitMaladie() {
    console.log(this.formMaladie.value);
    this.symptomeService.create(this.formMaladie.value).subscribe(res => {
      console.log('Maladie cree avec succes!');
      this.getAllMaladies();
    })
  }
  submitMedicament(){
    console.log(this.formMedicament.value);
    this.medicamentService.create(this.formMedicament.value).subscribe(res => {
         console.log('Medicament cree avec succes!');
         this.getAllMedicaments();
    })
  }

  private getAllMaladies() {
    this.symptomeService.getAll().subscribe((data: Maladie[]) => {
      this.listemaladies = data;
      //console.log(this.listemaladies);
    });
  }
  
  private getAllMedicaments() {
    this.medicamentService.getAll().subscribe((data: Medicament[]) => {
      this.listemedicaments = data;
      console.log(this.listemedicaments);
    })
  }
  getDiagnosedMaladie(){
    this.arrayIds = this.getArrayIds();
    this.symptomeService.getMaladieByArraySymptomeId(this.arrayIds).subscribe((data: Maladie[]) => {
      this.maladiesPossibles = data;
      console.log(this.maladiesPossibles);
      if(this.maladiesPossibles.length) this.trouveDiagno = true;
      this.maladiesPossibles.forEach(element => {
        this.medicamentsPossibles = this.medicamentsPossibles.concat(element.cures);
      });
      return;
    });
  }
  getArrayIds():number[]{
    var arrayId: number[] = [];
    this.ordonnance.symptomes.forEach(symptome => {
      arrayId.push(symptome.id);
    });
    return arrayId;
  }

}
