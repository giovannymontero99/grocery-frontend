import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuard } from './guard/AuthGuard';

export const routes: Routes = [
    { path: '', component: ProfileComponent, title: 'Profile', canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent, title: 'Login' },
    { path: 'register', component: RegisterComponent, title: 'Register' },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
