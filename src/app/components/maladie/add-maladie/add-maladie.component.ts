import { Component, OnInit } from '@angular/core';
import { Maladie } from 'src/app/models/Maladie';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MaladieService } from 'src/app/services/maladie/maladie.service';
import { Router } from '@angular/router';
import { SymptomeService } from 'src/app/services/symptome/symptome.service';
import { MedicamentService } from 'src/app/services/medicament/medicament.service';
import { Symptome } from 'src/app/models/Symptome';
import { Medicament } from 'src/app/models/Medicament';
import { TokenStorageService } from 'src/app/services/auth/token-storage.service';

@Component({
  selector: 'app-add-maladie',
  templateUrl: './add-maladie.component.html',
  styleUrls: ['./add-maladie.component.css']
})
export class AddMaladieComponent implements OnInit {
  maladie: Maladie;
  listemedicaments: Medicament[];
  form: FormGroup;
  listesymptomes: Symptome[];
  formSymptome: FormGroup;
  formMedicament: FormGroup;
  isDoctor = false;
  isLoggedIn = false;
  private roles: string[];
  user: any;

  constructor(private maladieService: MaladieService,
    private router: Router,
    private symptomeService: SymptomeService,
    private medicamentService: MedicamentService,
    private tokenStorageService: TokenStorageService
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
      this.getAllSymptomes();
      this.getAllMedicaments();
      this.form = new FormGroup({
        name: new FormControl('', [Validators.required]),
        symptomes: new FormControl('', [Validators.required]),
        cures: new FormControl('', [Validators.required])
      });
      this.formSymptome = new FormGroup({
        description: new FormControl('', [Validators.required])
      });
      this.formMedicament = new FormGroup({
        name: new FormControl('', [Validators.required])
      })
    }else{
      this.router.navigateByUrl('login');
    }
  }

  get f() {
    return this.form.controls;
  }
  submitForm() {
    console.log(this.form.value);
    this.maladieService.create(this.form.value).subscribe(res => {
      console.log('Maladie ajoutée avec succes!');
      this.router.navigateByUrl('maladies');
    })
  }
  submitSymptome() {
    console.log(this.formSymptome.value);
    this.symptomeService.create(this.formSymptome.value).subscribe(res => {
      console.log('Symptome cree avec succes!');
      this.getAllSymptomes();
    })
  }
  submitMedicament() {
    console.log(this.formMedicament.value);
    this.medicamentService.create(this.formMedicament.value).subscribe(res => {
      console.log('Medicament cree avec succes!');
      this.getAllMedicaments();
    })
  }

  private getAllSymptomes() {
    this.symptomeService.getAll().subscribe((data: Symptome[]) => {
      this.listesymptomes = data;
      console.log(this.listesymptomes);
    });
  }
  private getAllMedicaments() {
    this.medicamentService.getAll().subscribe((data: Medicament[]) => {
      this.listemedicaments = data;
      console.log(this.listemedicaments);
    })
  }
}
