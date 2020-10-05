import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/auth/user.service';
import { Directive, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content: string;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getPublicContent().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }
}
@Directive({ selector: '[mydirective]' })
export class ChangeColorDirective implements OnDestroy, AfterViewInit {
    ngAfterViewInit() {
        document.querySelector('body').classList.add('blue');

    }
    ngOnDestroy(): void {
        document.querySelector('body').classList.remove('blue');
    }
}
