import { firstValueFrom } from 'rxjs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  standalone: true
})
export class ProfileComponent implements OnInit {

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {

    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  formulario: FormGroup;

  ngOnInit(): void {
    // Fetch user profile data here
    //this.getProfileData();
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

  onSubmit() {
    if (this.formulario.valid) {
      console.log('Datos del formulario:', this.formulario.value);
      alert('Formulario enviado correctamente ✅');
    }
  }


  goTo(route: string) {
    this.router.navigate([route]);
  }
}
