import { firstValueFrom } from 'rxjs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Product, UserRs } from '../../interfaces/interfaces';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RoutesComponent } from '../../components/routes/routes.component';

@Component({
  standalone: true,
  selector: 'app-profile',
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
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router,
  ) {

  }

  userState: UserRs | null = null;
  products: Product[] = [];
  filteredProducts: Product[] = [];
  uniqueCategories: string[] = [];

  searchTerm = '';
  selectedCategory = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  isLoading = true;
  favoriteProductIds: number[] = [];
  selectedProduct: Product | null = null;


  ngOnInit(): void {
    this.getProducts();
    this.getProfileData();
  }

  // Fetch user profile data
  private async getProfileData() {
    try {
      this.userState = await firstValueFrom(this.userService.getUserProfile());
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  }

  // Fetch product data
  private async getProducts() {
    try {
      const response = await firstValueFrom(this.userService.getProducts());
      this.products = response;
      this.uniqueCategories = [...new Set(response.map(p => p.category))];
      this.applyFilters();
      this.isLoading = false;

    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  }

  // Detect changes and reapply filters
  ngDoCheck(): void {
    this.applyFilters();
  }

  // Apply filters to the product list
  applyFilters(): void {
    let result = [...this.products];

    // Filter by search
    if (this.searchTerm.trim()) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (this.selectedCategory) {
      result = result.filter(p => p.category === this.selectedCategory);
    }

    // Sort by price
    result.sort((a, b) => {
      return this.sortDirection === 'asc' ? a.price - b.price : b.price - a.price;
    });

    this.filteredProducts = result;
  }

  // Toggle favorite status
  toggleFavorite(productId: number): void {
    const index = this.favoriteProductIds.indexOf(productId);
    if (index >= 0) {
      this.favoriteProductIds.splice(index, 1); // remove
    } else {
      this.favoriteProductIds.push(productId); // add
    }
  }

  // Check if a product is favorited
  isFavorite(productId: number): boolean {
    return this.favoriteProductIds.includes(productId);
  }

  // Select a product for viewing details
  selectProduct(product: Product | null): void {
    this.selectedProduct = product;
  }


}
