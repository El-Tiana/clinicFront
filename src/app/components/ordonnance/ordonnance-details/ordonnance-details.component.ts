import { Component, OnInit } from '@angular/core';
import { Ordonnance } from 'src/app/models/Ordonnance';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/auth/token-storage.service';
import { UserService } from 'src/app/services/auth/user.service';
import { OrdonnanceService } from 'src/app/services/ordonnance/ordonnance.service';

@Component({
  selector: 'app-ordonnance-details',
  templateUrl: './ordonnance-details.component.html',
  styleUrls: ['./ordonnance-details.component.css']
})
export class OrdonnanceDetailsComponent implements OnInit {
  id: number;
  ordonnance: Ordonnance;
  isPatient = false;
  isLoggedIn = false;
  isDoctor = false;
  private roles: string[];
  user: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tokenStorageService: TokenStorageService,
    private userService: UserService,
    private ordonnanceService: OrdonnanceService) { }

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
    } else if (this.isDoctor) {
    } else {
      this.router.navigateByUrl('login');
    }
  }
  getById() {
    this.id = this.route.snapshot.params['id'];
    this.ordonnanceService.get(this.id).subscribe((data: Ordonnance) => {
      this.ordonnance = data;
      console.log(this.ordonnance.etat);
    });
  }
  exportXML(){
    
  }
}
