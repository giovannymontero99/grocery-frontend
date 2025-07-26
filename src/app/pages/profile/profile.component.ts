import { firstValueFrom, map } from 'rxjs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserRs } from '../../interfaces/interfaces';

@Component({
  selector: 'app-profile',
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  standalone: true
})
export class ProfileComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router
  ) {

  }

  userState: UserRs | null = null;

  ngOnInit(): void {
    // Fetch user profile data here
    this.getProfileData();
  }

  // Fetch user profile data
  private async getProfileData(){
    try {
      this.userState = await firstValueFrom(this.userService.getUserProfile());
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  }


}
