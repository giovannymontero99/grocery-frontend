import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule, RouterModule, MatInputModule, MatButtonModule, MatCardModule, ReactiveFormsModule, MatSnackBarModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {


  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ){
    this.formGroup = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
      fullname: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }


  formGroup: FormGroup;


  /**
   * Handles the form submission.
   */
  async onSubmit(){

    try {
      
      this.formGroup.markAllAsTouched();
      if (this.formGroup.invalid) {
        return;
      }
      const { fullname, email, username, password  } = this.formGroup.value;

      const response = await firstValueFrom(
        this.authService.register({
          Name: username,
          Email: email,
          FullName: fullname.toUpperCase(),
          Password: password
        })
      );

      this.authService.setToken(response.token);
      this.router.navigate(['/']);
      
    } catch (error: any) {
      if (error.status === 409) {
        this.snackBar.open('User already exists', 'Close', {
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
  }
}
