import { Component, OnInit } from '@angular/core';
import { Fiche } from 'src/app/models/Fiche';
import { FicheService } from 'src/app/services/fiche/fiche.service';
import { TokenStorageService } from 'src/app/services/auth/token-storage.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-list-fiche-user',
  templateUrl: './list-fiche-user.component.html',
  styleUrls: ['./list-fiche-user.component.css']
})
export class ListFicheUserComponent implements OnInit {

  fiches: Fiche[];
  isLoggedIn= false;
  roles: String[];
  isPatient= false;
  isDoctor= false;
  user: any;
  patient: string;
  listeetat = ["En attente","Pris en charge","Resolu"]
  constructor(public ficheService:FicheService,private tokenStorageService: TokenStorageService,private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {    
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.isPatient = this.roles.includes('ROLE_USER');
      this.isDoctor = this.roles.includes('ROLE_DOCTOR');
      this.user = user;
    }
    if (this.isPatient) {

      this.getFichesByIdPatient();
    }else if(this.isDoctor){
      this.getFichesByIdDoctor();
    }else{
      this.router.navigateByUrl('login');
    }
      
  }
  fetchFiche(){
    const temp = {
      id: this.user.id,
      email: this.user.email,
      username: this.user.username, 
      password: this.user.password
    }
  }
  deleteFiche(id){
    this.ficheService.delete(id).subscribe(res => {
         this.fiches = this.fiches.filter(item => item.id !== id);
         console.log('Post deleted successfully!');
    })
  }
  getAllFiches(){
    this.ficheService.getAll().subscribe((data: Fiche[])=>{
      this.fiches = data;
      console.log(this.fiches);
    })
  }
  getFichesByEtat(etat:number){
    this.ficheService.getByEtat(etat).subscribe((data: Fiche[])=>{
      this.fiches = data;
      console.log(this.fiches);
    })
  }
  getFichesByIdPatient(){
    console.log(this.patient);
    this.ficheService.getByUserId(this.user.id).subscribe((data: Fiche[])=>{
      this.fiches = data;
      console.log(this.fiches);
    })
  }
  getFichesByIdPatientAndEtat(etat){
    console.log(this.patient);
    this.ficheService.getByUserIdAndEtat(this.user.id,etat).subscribe((data: Fiche[])=>{
      this.fiches = data;
      console.log(this.fiches);
    })
  }
  getFichesByIdDoctor(){
    this.ficheService.getByDoctorId(this.user.id).subscribe((data: Fiche[])=>{
      this.fiches = data;
      console.log(this.fiches);
    })
  }
  getFichesByIdDoctorAndEtat(etat){
    console.log(this.patient);
    this.ficheService.getByDoctorIdAndEtat(this.user.id,etat).subscribe((data: Fiche[])=>{
      this.fiches = data;
      console.log(this.fiches);
    })
  }
  showAll(mode){
    if(mode===1){
      console.log("patient");
      this.getFichesByIdPatient();
    }else if(mode===2){
      console.log("doctor");
      this.getFichesByIdDoctor();
    }
  }
  showAttente(mode){
    if(mode===1){
      console.log("patient");
      this.getFichesByIdPatientAndEtat(0);
    }else if(mode===2){
      console.log("doctor");
      this.getFichesByEtat(0);
    }
  }
  showGere(mode){
    if(mode===1){
      console.log("patient");
      this.getFichesByIdPatientAndEtat(1);
    }else if(mode===2){
      console.log("doctor");
      this.getFichesByIdDoctorAndEtat(1);
    }
  }
  showFini(mode){
    if(mode===1){
      console.log("patient");
      this.getFichesByIdPatientAndEtat(2);
    }else if(mode===2){
      console.log("doctor");
      this.getFichesByIdDoctorAndEtat(2);
    }
  }
}
