import { Component, OnInit } from '@angular/core';
import { Maladie } from 'src/app/models/Maladie';
import { Medicament } from 'src/app/models/Medicament';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Symptome } from 'src/app/models/Symptome';
import { MaladieService } from 'src/app/services/maladie/maladie.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SymptomeService } from 'src/app/services/symptome/symptome.service';
import { MedicamentService } from 'src/app/services/medicament/medicament.service';

@Component({
  selector: 'app-update-maladie',
  templateUrl: './update-maladie.component.html',
  styleUrls: ['./update-maladie.component.css']
})
export class UpdateMaladieComponent implements OnInit {
  maladie: Maladie;
  listemedicaments: Medicament[];
  form: FormGroup;
  listesymptomes: Symptome[];
  formSymptome: FormGroup;
  formMedicament: FormGroup;
  id: number;

  constructor(private maladieService: MaladieService,
    private router: Router,
    private symptomeService: SymptomeService,
    private medicamentService: MedicamentService, 
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
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
    });
    this.getMaladieById();
  }

  get f() {
    return this.form.controls;
  }
  submitForm() {
    console.log(this.form.value);
    this.maladieService.update(this.id,this.form.value).subscribe(res => {
         console.log('Maladie modifiée avec succes!');
         this.router.navigateByUrl('maladies');
    })
  }
  submitSymptome(){
    console.log(this.formSymptome.value);
    this.symptomeService.create(this.formSymptome.value).subscribe(res => {
      console.log('Symptome cree avec succes!');
      this.getAllSymptomes();
 })
  }
  submitMedicament(){
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
  private getMaladieById() {
    this.maladieService.get(this.id).subscribe((data: Maladie) => {
      this.maladie = data;
    });
  }
}
