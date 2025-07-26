import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../interfaces/interfaces';
import { Router } from '@angular/router';
import { ErrorComponent } from '../../components/error/error.component';


@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, ErrorComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ){

  }
  errorMessage: string = "";
  username: string = "";
  password: string = "";


  /**
   * Handles the login process when the user submits their credentials.
   * 
   * Validates the provided username and password. If the credentials are invalid,
   * it triggers the invalid credentials handler and exits early. Otherwise, it proceeds
   * to perform the login operation.
   *
   * @remarks
   * This method should be called when the user attempts to log in.
   */
  onLogin(): void {
    if (!this.validateCredentials(this.username, this.password)) {
      this.handleMessageError("Invalid username or password. Minimum 4 characters required.");
      return;
    }
    this.performLogin();
  }

  
  /**
   * Validates the provided username and password based on minimum length requirements.
   *
   * @param username - The username to validate. Must be at least 4 characters long.
   * @param password - The password to validate. Must be at least 4 characters long.
   * @returns `true` if both username and password are provided and meet the minimum length; otherwise, `false`.
   */
  private validateCredentials(username: string, password: string): boolean {
    // Example validation: username and password must be at least 4 characters
    if (!username || !password) {
      return false;
    }
    if (username.length < 4 || password.length < 4) {
      return false;
    }
    return true;
  }

  /**
   * Handles error messages by displaying them for a short duration.
   *
   * @param message - The error message to display.
   */
  private handleMessageError(message: string): void {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = "";
    }, 3000);
  }

  private performLogin(): void {

    const user: User = {
      Name: this.username,
      Password: this.password
    }

    this.authService.login(user).subscribe({
      next: (response) => {
        console.log(response)
      },
      error: (err) => {
        if(err.status === 404){
          err.message = "User not found. Please check your username.";
        }
        this.handleMessageError(err.message);
      }
    });
  }

  onRegister(){
    // Navigate to the registration page
    this.router.navigate(['/register']);
  }


}
