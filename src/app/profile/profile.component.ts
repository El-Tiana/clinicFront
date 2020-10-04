import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../services/auth/token-storage.service';
import { UserService } from '../services/user/user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  id: number;
  currentUser: User;

  constructor(private token: TokenStorageService,private userService: UserService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.userService.get(this.id).subscribe((data: User)=>{
      this.currentUser = data;
      this.currentUser.password = "";
    });
  }

}
