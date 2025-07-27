import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { firstValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {


  formGroup: FormGroup;


  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.formGroup = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(4)]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {

  }


  async onSubmit() {
    if (this.formGroup.valid) {
      const { username, password } = this.formGroup.value;
      try {
        const response = await firstValueFrom(this.authService.login({ Name: username, Password: password }));
        this.authService.setToken(response.token);
        this.router.navigate(['/']);
      } catch (error: any) {
        if (error.status === 401) {
          this.snackBar.open('Invalid username or password', 'Close', {
            duration: 4000,
            panelClass: ['error-snackbar']
          });
        } else if (error.status === 404) {
          this.snackBar.open("User doesn't exist", 'Close', {
            duration: 4000,
            panelClass: ['error-snackbar']
          });
        }
        else {
          this.snackBar.open('An error occurred. Please try again later.', 'Close', {
            duration: 4000,
            panelClass: ['error-snackbar']
          });
        }
      }
    }
  }
}
