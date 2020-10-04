import { Component, OnInit } from '@angular/core';
import { Maladie } from 'src/app/models/Maladie';
import { MaladieService } from 'src/app/services/maladie/maladie.service';
import { TokenStorageService } from 'src/app/services/auth/token-storage.service';

@Component({
  selector: 'app-list-maladie',
  templateUrl: './list-maladie.component.html',
  styleUrls: ['./list-maladie.component.css']
})
export class ListMaladieComponent implements OnInit {

  maladies : Maladie[];
  isPatient = false;
  isLoggedIn = false;
  isDoctor = false;
  private roles: string[];
  user: any;
  constructor(public symptomeService:MaladieService,private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.symptomeService.getAll().subscribe((data: Maladie[])=>{
      this.maladies = data;
      console.log(this.maladies);
    })  
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.isPatient = this.roles.includes('ROLE_USER');
      this.isDoctor = this.roles.includes('ROLE_DOCTOR');
      this.user = user;
    }
  }
  deleteMaladie(id){
    this.symptomeService.delete(id).subscribe(res => {
         this.maladies = this.maladies.filter(item => item.id !== id);
         console.log('Post deleted successfully!');
    })
  }
}
