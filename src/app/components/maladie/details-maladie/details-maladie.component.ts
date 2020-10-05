import { Component, OnInit } from '@angular/core';
import { Maladie } from 'src/app/models/Maladie';
import { MaladieService } from 'src/app/services/maladie/maladie.service';
import { ActivatedRoute } from '@angular/router';
import { TokenStorageService } from 'src/app/services/auth/token-storage.service';

@Component({
  selector: 'app-details-maladie',
  templateUrl: './details-maladie.component.html',
  styleUrls: ['./details-maladie.component.css']
})
export class DetailsMaladieComponent implements OnInit {

  id: number;
  maladie: Maladie;
  isPatient = false;
  isLoggedIn = false;
  isDoctor = false;
  private roles: string[];
  user: any;

  constructor(
    public maladieService: MaladieService,
    private route: ActivatedRoute,private tokenStorageService: TokenStorageService
   ) { }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.maladieService.get(this.id).subscribe((data: Maladie)=>{
      this.maladie = data;
    });
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.isPatient = this.roles.includes('ROLE_USER');
      this.isDoctor = this.roles.includes('ROLE_DOCTOR');
      this.user = user;
    }
  }
}
