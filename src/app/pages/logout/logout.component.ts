import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent implements OnInit {


  constructor(
    private authService: AuthService,
    private router: Router
  ){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit(){

  }



}
