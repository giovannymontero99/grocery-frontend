import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-navbar-routes',
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './navbar-routes.component.html',
  styleUrl: './navbar-routes.component.scss'
})
export class NavbarRoutesComponent {

}
