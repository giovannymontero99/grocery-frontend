import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-home',
  imports: [MatProgressSpinnerModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ){
  }

  ngOnInit(): void {
    if(this.authService.isAuthenticated()){
      this.router.navigate(['/profile']);
    }else{
      this.router.navigate(['/login']);
    }
  }

}
