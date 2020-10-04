import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './services/auth/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'clinicFront';
  private roles: string[];
  isLoggedIn = false;
  isDoctor = false;
  isPatient = false;
  username: string;
  iduser: number;

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.isPatient = this.roles.includes('ROLE_USER');
      this.isDoctor = this.roles.includes('ROLE_DOCTOR');

      this.username = user.username;
      this.iduser = user.id;
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
