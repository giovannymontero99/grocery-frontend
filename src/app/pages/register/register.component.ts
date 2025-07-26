import { Component } from '@angular/core';
import { ErrorComponent } from '../../components/error/error.component';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ErrorComponent, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {


  constructor(
    private authService: AuthService,
    private router: Router
  ){}


  errorMessage: string = "";
  username: string = "";
  password: string = "";
  fullName: string = "";
  email: string = "";


  onRegister(){
    if (this.validateForm()) {
      this.register()
    }
  }

  // Resets the form fields to their initial values.
  private resetForm() {
    this.username = "";
    this.password = "";
    this.fullName = "";
    this.email = "";
  }

  // Validates the form fields.
  private validateForm(): boolean {
    if (!this.username || !this.password || !this.fullName || !this.email) {
      this.handleMessageError("All fields are required.");
      return false;
    }
    this.errorMessage = "";
    return true;
  }

  // Registers a new user.
  private async register(){

    try {
      const response = await firstValueFrom(
        this.authService.register({
          Name: this.username,
          Email: this.email,
          FullName: this.fullName,
          Password: this.password
        })
      );

      this.authService.setToken(response.token);
      this.router.navigate(['/profile']);
    } catch (error: any) {
      if(error.status == 409){
        this.handleMessageError(error.error.message);
      }else{
        this.handleMessageError(error.message);
      }
    }
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

}
