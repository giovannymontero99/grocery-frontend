import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../interfaces/interfaces';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterModule, MatInputModule, MatButtonModule, MatCardModule, ReactiveFormsModule, MatSnackBarModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true
})
export class LoginComponent {

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ){
    this.formGroup = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  formGroup: FormGroup;

  onSubmit(){
    if (this.formGroup.valid) {

      const { username, password } = this.formGroup.value;

      this.authService.login({ Name: username, Password: password }).subscribe({

        next: (response) => {
          this.authService.setToken(response.token);
          this.router.navigate(['/']);
        },

        error: (error: HttpErrorResponse) => {

          if (error.status === 401) {
            this.snackBar.open('Invalid username or password', 'Close', {
              duration: 4000,
              panelClass: ['error-snackbar']
            });
          } else {
            this.snackBar.open('An unexpected error occurred', 'Close', {
              duration: 4000,
              panelClass: ['error-snackbar']
            });
          }
        }
      });
    }
  }


  onRegister(){
    // Navigate to the registration page
    this.router.navigate(['/register']);
  }

}
