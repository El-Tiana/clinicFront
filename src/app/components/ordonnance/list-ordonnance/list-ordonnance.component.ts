import { Component, OnInit } from '@angular/core';
import { Ordonnance } from 'src/app/models/Ordonnance';
import { OrdonnanceService } from 'src/app/services/ordonnance/ordonnance.service';
import { TokenStorageService } from 'src/app/services/auth/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-ordonnance',
  templateUrl: './list-ordonnance.component.html',
  styleUrls: ['./list-ordonnance.component.css']
})
export class ListOrdonnanceComponent implements OnInit {
  ordonnances: Ordonnance[];
  isLoggedIn= false;
  roles: String[];
  isPatient= false;
  isDoctor= false;
  user: any;
  patient: string;
  listeetat = ["Non validées","Validées"];
  constructor(public ficheService:OrdonnanceService,private tokenStorageService: TokenStorageService,private router: Router,) { }

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
      this.getOrdonnancesByIdPatient();
    }else if(this.isDoctor){
      this.getOrdonnancesByIdMedecinAndEtat(1);
    }else{
      this.router.navigateByUrl('login');
    }
      
  }
  fetchOrdonnance(){
    const temp = {
      id: this.user.id,
      email: this.user.email,
      username: this.user.username, 
      password: this.user.password
    }
  }
  deleteOrdonnance(id){
    this.ficheService.delete(id).subscribe(res => {
         this.ordonnances = this.ordonnances.filter(item => item.id !== id);
         console.log('Post deleted successfully!');
    })
  }
  getAllOrdonnances(){
    this.ficheService.getAll().subscribe((data: Ordonnance[])=>{
      this.ordonnances = data;
      console.log(this.ordonnances);
    })
  }
  getOrdonnancesByIdPatient(){
    console.log(this.patient);
    this.ficheService.getByPatientId(this.user.id).subscribe((data: Ordonnance[])=>{
      this.ordonnances = data;
      console.log(this.ordonnances);
    })
  }
  getOrdonnancesByIdMedecinAndEtat(etat:number){
    var params:number[] = [this.user.id, etat];
    this.ficheService.getByMedecinIdAndEtat(params).subscribe((data: Ordonnance[])=>{
      this.ordonnances = data;
      console.log(this.ordonnances);
    })
  }
  showAttente(){
      this.getOrdonnancesByIdMedecinAndEtat(0);
  }
  showResolu(){
    this.getOrdonnancesByIdMedecinAndEtat(1);
  }
}
