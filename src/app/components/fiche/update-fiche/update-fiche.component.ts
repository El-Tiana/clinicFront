import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Symptome } from 'src/app/models/Symptome';
import { Fiche } from 'src/app/models/Fiche';
import { FicheService } from 'src/app/services/fiche/fiche.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SymptomeService } from 'src/app/services/symptome/symptome.service';
import { TokenStorageService } from 'src/app/services/auth/token-storage.service';

@Component({
  selector: 'app-update-fiche',
  templateUrl: './update-fiche.component.html',
  styleUrls: ['./update-fiche.component.css']
})
export class UpdateFicheComponent implements OnInit {

  form: FormGroup;
  listesymptomes: Symptome[];
  formSymptome: FormGroup;
  isPatient = false;
  isLoggedIn = false;
  private roles: string[];
  fiche: Fiche;
  user: any;
  id:number;
  isModifiable = true;

  constructor(private ficheService: FicheService,
    private router: Router,
    private symptomeService: SymptomeService,
    private tokenStorageService: TokenStorageService,
    private route: ActivatedRoute
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
      this.getById();
      console.log("apres getallsyptomes");
      this.form = new FormGroup({
        symptomes: new FormControl('', [Validators.required])
      });
      this.formSymptome = new FormGroup({
        description: new FormControl('', [Validators.required])
      });
      if(this.fiche.etat!=0) this.isModifiable = false;
      console.log(this.fiche);
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
    this.ficheService.update(this.id,this.fiche).subscribe(res => {
      console.log('Fiche modifiee avec succes!');
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
  getById() {
    this.id = this.route.snapshot.params['id'];
    this.ficheService.get(this.id).subscribe((data: Fiche) => {
      this.fiche = data;
      console.log(this.fiche.etat);
    });
  }

}
