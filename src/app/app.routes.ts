import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ProfileComponent } from './features/profile/profile.component';
import { RegisterComponent } from './features/register/register.component';
import { AuthGuard } from './core/guards/AuthGuard';
import { LogoutComponent } from './features/logout/logout.component';
import { MylistComponent } from './features/mylist/mylist.component';
import { LoginComponent } from './features/login/login.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, title: 'Home' },
    { path: 'profile', component: ProfileComponent, title: 'Profile', canActivate: [AuthGuard] },
    { path: 'mylist', component: MylistComponent, title: 'My List', canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent, title: 'Login',  },
    { path: 'register', component: RegisterComponent, title: 'Register', },
    { path: 'logout', component: LogoutComponent, title: 'Logout', canActivate: [AuthGuard] },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
