import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { InventoryFilter, CATEGORIES } from '../../models/inventory.model';

@Component({
  selector: 'app-inventory-filters',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule
  ],
  template: `
    <mat-card class="filter-card">
      <mat-card-content>
        <div class="filter-container">
          <mat-form-field appearance="outline">
            <mat-label>Category</mat-label>
            <mat-select [(ngModel)]="filter.category" (selectionChange)="onFilterChange()">
              <mat-option value="">All Categories</mat-option>
              @for (category of categories; track category) {
                <mat-option [value]="category">{{ category }}</mat-option>
              }
            </mat-select>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Stock Status</mat-label>
            <mat-select [(ngModel)]="filter.stockStatus" (selectionChange)="onFilterChange()">
              <mat-option value="">All</mat-option>
              <mat-option value="out-of-stock">Out of Stock</mat-option>
              <mat-option value="low">Low Stock</mat-option>
              <mat-option value="in-stock">In Stock</mat-option>
            </mat-select>
          </mat-form-field>

          <button mat-raised-button color="accent" (click)="resetFilters()">Reset Filters</button>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .filter-container {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
      align-items: center;
    }
    
    mat-form-field {
      min-width: 200px;
    }
    
    @media (max-width: 599px) {
      .filter-container {
        flex-direction: column;
        align-items: stretch;
      }
      
      mat-form-field, button {
        width: 100%;
      }
    }
  `]
})
export class InventoryFiltersComponent implements OnInit {
  @Output() filterChanged = new EventEmitter<InventoryFilter>();
  
  filter: InventoryFilter = {
    category: '',
    stockStatus: ''
  };
  
  categories = CATEGORIES;
  
  ngOnInit(): void {
    // Emit initial filter to load all items
    this.filterChanged.emit(this.filter);
  }
  
  onFilterChange(): void {
    this.filterChanged.emit(this.filter);
  }
  
  resetFilters(): void {
    this.filter = {
      category: '',
      stockStatus: ''
    };
    this.filterChanged.emit(this.filter);
  }
}