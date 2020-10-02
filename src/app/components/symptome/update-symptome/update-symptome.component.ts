import { Component, OnInit } from '@angular/core';
import { Symptome } from 'src/app/models/Symptome';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SymptomeService } from 'src/app/services/symptome/symptome.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-symptome',
  templateUrl: './update-symptome.component.html',
  styleUrls: ['./update-symptome.component.css']
})
export class UpdateSymptomeComponent implements OnInit {
  id: number;
  symptome: Symptome;
  form: FormGroup;

  constructor(public symptomeService: SymptomeService, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.symptomeService.get(this.id).subscribe((data: Symptome) => {
      this.symptome = data;
    });
    this.form = new FormGroup({
      description: new FormControl('', [Validators.required])
    });
  }

  get f() {
    return this.form.controls;
  }

  submitForm() {
    console.log(this.form.value);
    this.symptomeService.update(this.id, this.form.value).subscribe(res => {
      console.log('Symptome modifié avec succès');
      this.router.navigateByUrl('symptomes');
    })
  }
}
