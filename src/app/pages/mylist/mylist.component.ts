import { Component, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RoutesComponent } from '../../components/routes/routes.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { firstValueFrom } from 'rxjs';
import { UserService } from '../../services/user.service';
import { UserProductRs } from '../../interfaces/interfaces';

@Component({
  standalone: true,
  selector: 'app-mylist',
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatCardModule,
    FormsModule,
    MatIconModule,
    RoutesComponent
  ],
  templateUrl: './mylist.component.html',
  styleUrl: './mylist.component.scss',
})
export class MylistComponent implements OnInit {


  constructor(
    private userService: UserService
  ){

  }

  favoriteProducts: UserProductRs[] = [];

  ngOnInit(): void {
    this.getFavoriteProducts()
  }

  private async getFavoriteProducts() {
    try {
      const products = await firstValueFrom(this.userService.getFavoriteProducts());
      this.favoriteProducts = products;
    } catch (error) {
      console.error('Error fetching favorite products:', error);
    }
  }


  async deleteFromFavorites(productId: number) {
    try {
      await firstValueFrom(this.userService.deleteFromFavorites(productId));
      this.favoriteProducts = this.favoriteProducts.filter(fav => fav.userProductId !== productId);
    } catch (error) {
      console.error('Error deleting from favorites:', error);
    }
  }

}
