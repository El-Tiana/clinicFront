import { Component, OnInit } from '@angular/core';
import { Fiche } from 'src/app/models/Fiche';
import { FicheService } from 'src/app/services/fiche/fiche.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/auth/token-storage.service';

@Component({
  selector: 'app-details-fiche',
  templateUrl: './details-fiche.component.html',
  styleUrls: ['./details-fiche.component.css']
})
export class DetailsFicheComponent implements OnInit {

  id: number;
  fiche: Fiche;
  isPatient = false;
  isLoggedIn = false;
  isDoctor= false;
  private roles: string[];
  user: any;
  isCharge= false;

  constructor(
    public ficheService: FicheService,
    private route: ActivatedRoute,
    private router: Router,
    private tokenStorageService: TokenStorageService
   ) { }
  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {    
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.isPatient = this.roles.includes('ROLE_USER');
      this.isDoctor = this.roles.includes('ROLE_DOCTOR');
      this.user = user;
      this.getById();
    }
    if (this.isPatient) {
    }else if(this.isDoctor){
    }else{
      this.router.navigateByUrl('login');
    }
  }
  getById(){
    this.id = this.route.snapshot.params['id'];
    this.ficheService.get(this.id).subscribe((data: Fiche)=>{
      this.fiche= data;
      if(data.medecin != undefined) this.isCharge = true;
    });
  }
  deleteFiche(id){
    this.ficheService.delete(id).subscribe(res => {
         console.log('Post deleted successfully!');
         this.router.navigateByUrl('fichesuser');
    })
  }
  prendreCharge(){

  }
}
