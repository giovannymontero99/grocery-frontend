import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuard } from './guard/AuthGuard';
import { LogoutComponent } from './pages/logout/logout.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, title: 'Home' },
    { path: 'profile', component: ProfileComponent, title: 'Profile', canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent, title: 'Login',  },
    { path: 'register', component: RegisterComponent, title: 'Register', },
    { path: 'logout', component: LogoutComponent, title: 'Logout', canActivate: [AuthGuard] },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
