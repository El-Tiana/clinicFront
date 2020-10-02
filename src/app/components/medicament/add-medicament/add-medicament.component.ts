import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Medicament } from 'src/app/models/Medicament';
import { MedicamentService } from 'src/app/services/medicament/medicament.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-medicament',
  templateUrl: './add-medicament.component.html',
  styleUrls: ['./add-medicament.component.css']
})
export class AddMedicamentComponent implements OnInit {

  medicament : Medicament ;
  form:FormGroup;
  constructor(private medicamentService: MedicamentService, private router: Router) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      name: new FormControl('', [Validators.required])
    });
  }
  get f(){
    return this.form.controls;
  }   
  submitForm(){

    console.log(this.form.value);

    this.medicamentService.create(this.form.value).subscribe(res => {

         console.log('Medicament cree avec succes!');

         this.router.navigateByUrl('medicaments');

    })
  }
}
