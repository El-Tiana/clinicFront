import { Component, OnInit } from '@angular/core';
import { Medicament } from 'src/app/models/Medicament';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MedicamentService } from 'src/app/services/medicament/medicament.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-medicament',
  templateUrl: './update-medicament.component.html',
  styleUrls: ['./update-medicament.component.css']
})
export class UpdateMedicamentComponent implements OnInit {
  id: number;
  medicament: Medicament;
  form: FormGroup;

  constructor(public medicamentService: MedicamentService, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.medicamentService.get(this.id).subscribe((data: Medicament) => {
      this.medicament = data;
    });
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required])
    });
  }

  get f() {
    return this.form.controls;
  }

  submitForm() {
    console.log(this.form.value);
    this.medicamentService.update(this.id, this.form.value).subscribe(res => {
      console.log('Medicament modifié avec succès');
      this.router.navigateByUrl('medicaments');
    })
  }

}
