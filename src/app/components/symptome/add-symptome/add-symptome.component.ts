import { Component, OnInit } from '@angular/core';
import { SymptomeService } from 'src/app/services/symptome/symptome.service';
import { Symptome } from 'src/app/models/Symptome';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-symptome',
  templateUrl: './add-symptome.component.html',
  styleUrls: ['./add-symptome.component.css']
})
export class AddSymptomeComponent implements OnInit {
  symptome : Symptome ;
  form:FormGroup;
  constructor(private symptomeService: SymptomeService, private router: Router) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      description: new FormControl('', [Validators.required])
    });
  }
  get f(){
    return this.form.controls;
  }   
  submitForm(){

    console.log(this.form.value);

    this.symptomeService.create(this.form.value).subscribe(res => {

         console.log('Symptome cree avec succes!');

         this.router.navigateByUrl('symptomes');

    })

  }

}
