import { firstValueFrom } from 'rxjs';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserService) { 

  }

  ngOnInit(): void {
    // Fetch user profile data here
    this.getProfileData();
  }

  // Fetch user profile data
  private async getProfileData(){
    try {
      const profileData = await firstValueFrom(this.userService.getUserProfile());
      console.log(profileData);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  }
}
