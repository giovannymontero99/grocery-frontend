import { Component, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
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
import { UserService } from '../../core/services/user.service';
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
  ],
  templateUrl: './mylist.component.html',
  styleUrl: './mylist.component.scss',
})
export class MylistComponent implements OnInit {


  constructor(
    private userService: UserService
  ){

  }

  // Favorite products datasource
  favoriteProducts: UserProductRs[] = [];

  ngOnInit(): void {
    this.getFavoriteProducts()
  }

  // Get favorite products
  private async getFavoriteProducts() {
    try {
      const products = await firstValueFrom(this.userService.getFavoriteProducts());
      this.favoriteProducts = products;
    } catch (error) {
      console.error('Error fetching favorite products:', error);
    }
  }

  // Delete a product from favorites
  async deleteFromFavorites(productId: number) {
    try {
      await firstValueFrom(this.userService.deleteFromFavorites(productId));
      this.favoriteProducts = this.favoriteProducts.filter(fav => fav.userProductId !== productId);
    } catch (error) {
      console.error('Error deleting from favorites:', error);
    }
  }

  // Save a product to the favorite list
  async addSaveFavorites(productId: number) {
    try {
      const product = this.favoriteProducts.find(fav => fav.userProductId === productId);
      if (product) {
        product.isSaved = !product.isSaved;
      }
      await firstValueFrom(this.userService.saveProductToFavorites(productId));
    } catch (error) {
      console.error('Error saving to favorites:', error);
    }
  }


}
