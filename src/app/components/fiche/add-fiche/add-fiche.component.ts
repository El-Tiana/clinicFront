import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Symptome } from 'src/app/models/Symptome';
import { FicheService } from 'src/app/services/fiche/fiche.service';
import { Router } from '@angular/router';
import { SymptomeService } from 'src/app/services/symptome/symptome.service';
import { TokenStorageService } from 'src/app/services/auth/token-storage.service';
import { Fiche } from 'src/app/models/Fiche';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/auth/user.service';

@Component({
  selector: 'app-add-fiche',
  templateUrl: './add-fiche.component.html',
  styleUrls: ['./add-fiche.component.css']
})
export class AddFicheComponent implements OnInit {
  form: FormGroup;
  listesymptomes: Symptome[];
  formSymptome: FormGroup;
  formMedicament: FormGroup;
  isPatient = false;
  isLoggedIn = false;
  private roles: string[];
  fiche: Fiche;
  user: any;

  constructor(private ficheService: FicheService,
    private router: Router,
    private symptomeService: SymptomeService,
    private tokenStorageService: TokenStorageService
  ) {
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {    
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.isPatient = this.roles.includes('ROLE_USER');
      this.user = user;
    }
    if (this.isPatient) {
      this.getAllSymptomes();
      this.form = new FormGroup({
        symptomes: new FormControl('', [Validators.required])
      });
      this.formSymptome = new FormGroup({
        description: new FormControl('', [Validators.required])
      });
    }else{
      this.router.navigateByUrl('login');
    }
  }

  get f() {
    return this.form.controls;
  }
  fetchFiche(){
    this.fiche = this.form.value;
    const temp = {
      id: this.user.id,
      email: this.user.email,
      username: this.user.username, 
      password: this.user.password
    }
    this.fiche.patient = temp;
  }
  submitForm() {
    this.fetchFiche();
    console.log(this.fiche);
    this.ficheService.create(this.fiche).subscribe(res => {
      console.log('Fiche créee avec succes!');
      this.router.navigateByUrl('fichesuser');
    })
  }
  submitSymptome() {
    console.log(this.formSymptome.value);
    this.symptomeService.create(this.formSymptome.value).subscribe(res => {
      console.log('Symptome cree avec succes!');
      this.getAllSymptomes();
    })
  }

  private getAllSymptomes() {
    this.symptomeService.getAll().subscribe((data: Symptome[]) => {
      this.listesymptomes = data;
      console.log(this.listesymptomes);
    });
  }
}
