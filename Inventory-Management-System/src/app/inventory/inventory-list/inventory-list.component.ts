import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { InventoryService } from '../../services/inventory.service';
import { NotificationService } from '../../services/notification.service';
import { Inventory, InventoryFilter } from '../../models/inventory.model';
import { InventoryFiltersComponent } from '../inventory-filters/inventory-filters.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-inventory-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSnackBarModule,
    InventoryFiltersComponent
  ],
  template: `
    <div class="page-header">
      <h1>Inventory Management</h1>
      <div class="action-buttons">
        <a mat-raised-button color="primary" routerLink="/inventory/new">
          <mat-icon>add</mat-icon>
          Add New Item
        </a>
      </div>
    </div>

    <app-inventory-filters (filterChanged)="applyFilters($event)"></app-inventory-filters>

    <ng-container *ngIf="isLoading; else content">
      <div class="spinner-container">
        <mat-spinner diameter="50"></mat-spinner>
      </div>
    </ng-container>

    <ng-template #content>
      <div *ngIf="filteredInventory.length === 0" class="no-data">
        <mat-card>
          <mat-card-content class="text-center">
            <p>No inventory items found. Add some items to get started.</p>
            <a mat-raised-button color="primary" routerLink="/inventory/new">Add Inventory Item</a>
          </mat-card-content>
        </mat-card>
      </div>

      <div *ngIf="filteredInventory.length > 0">
        <table mat-table [dataSource]="paginatedInventory" matSort (matSortChange)="sortData($event)" class="full-width">
          <!-- Position Column -->
          <ng-container matColumnDef="id">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>ID</th>
            <td mat-cell *matCellDef="let item">{{item.id}}</td>
          </ng-container>

          <!-- Name Column -->
          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Name</th>
            <td mat-cell *matCellDef="let item">{{item.name}}</td>
          </ng-container>

          <!-- Category Column -->
          <ng-container matColumnDef="category">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Category</th>
            <td mat-cell *matCellDef="let item">{{item.category}}</td>
          </ng-container>

          <!-- Quantity Column -->
          <ng-container matColumnDef="quantity">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Quantity</th>
            <td mat-cell *matCellDef="let item" [ngClass]="getStockClass(item)">{{item.quantity}}</td>
          </ng-container>

          <!-- Supplier Column -->
          <ng-container matColumnDef="supplier">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Supplier</th>
            <td mat-cell *matCellDef="let item">{{item.supplier_id}}</td>
          </ng-container>

          <!-- Actions Column -->
          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef>Actions</th>
            <td mat-cell *matCellDef="let item">
              <div class="action-buttons">
                <a mat-icon-button color="primary" [routerLink]="['/inventory/edit', item.id]" title="Edit">
                  <mat-icon>edit</mat-icon>
                </a>
                <button mat-icon-button color="warn" (click)="openDeleteDialog(item)" title="Delete">
                  <mat-icon>delete</mat-icon>
                </button>
              </div>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;" class="inventory-row"></tr>
        </table>

        <mat-paginator
          [length]="filteredInventory.length"
          [pageSize]="pageSize"
          [pageSizeOptions]="[5, 10, 25, 100]"
          (page)="onPageChange($event)"
          aria-label="Select page">
        </mat-paginator>
      </div>
    </ng-template>
  `,
  styles: [`
    .inventory-row {
      cursor: pointer;
    }
    
    .inventory-row:hover {
      background-color: rgba(0, 0, 0, 0.04);
    }
    
    .no-data {
      margin: 20px 0;
    }
    
    .out-of-stock {
      color: #F44336;
      font-weight: bold;
    }
    
    .low-stock {
      color: #FF9800;
      font-weight: bold;
    }
    
    .in-stock {
      color: #4CAF50;
    }
  `]
})
export class InventoryListComponent implements OnInit {
  inventory: Inventory[] = [];
  filteredInventory: Inventory[] = [];
  paginatedInventory: Inventory[] = [];
  displayedColumns: string[] = ['id', 'name', 'category', 'quantity', 'supplier', 'actions'];
  isLoading = true;
  
  // Pagination
  pageIndex = 0;
  pageSize = 10;
  
  constructor(
    private inventoryService: InventoryService,
    private notificationService: NotificationService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadInventory();
  }

  loadInventory(): void {
    this.isLoading = true;
    this.inventoryService.getInventoryItems().subscribe({
      next: (data) => {
        this.inventory = data;
        this.filteredInventory = [...data];
        this.updatePaginatedItems();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching inventory:', error);
        this.notificationService.error('Failed to load inventory items. Please try again.');
        this.isLoading = false;
      }
    });
  }

  applyFilters(filter: InventoryFilter): void {
    this.isLoading = true;
    this.inventoryService.filterInventory(filter).subscribe({
      next: (data) => {
        this.filteredInventory = data;
        this.pageIndex = 0;
        this.updatePaginatedItems();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error filtering inventory:', error);
        this.notificationService.error('Failed to filter inventory items.');
        this.isLoading = false;
      }
    });
  }

  sortData(sort: Sort): void {
    if (!sort.active || sort.direction === '') {
      this.filteredInventory = [...this.inventory];
      this.updatePaginatedItems();
      return;
    }

    this.filteredInventory = this.filteredInventory.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id': return this.compare(a.id, b.id, isAsc);
        case 'name': return this.compare(a.name, b.name, isAsc);
        case 'category': return this.compare(a.category, b.category, isAsc);
        case 'quantity': return this.compare(a.quantity, b.quantity, isAsc);
        case 'supplier': return this.compare(a.supplier_name, b.supplier_name, isAsc);
        default: return 0;
      }
    });
    this.updatePaginatedItems();
  }

  compare(a: any, b: any, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  getStockClass(item: Inventory): string {
    if (item.quantity === 0) {
      return 'out-of-stock';
    } else if (item.quantity <= 5) {
      return 'low-stock';
    } else {
      return 'in-stock';
    }
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedItems();
  }

  updatePaginatedItems(): void {
    const startIndex = this.pageIndex * this.pageSize;
    this.paginatedInventory = this.filteredInventory.slice(startIndex, startIndex + this.pageSize);
  }

  openDeleteDialog(item: Inventory): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: 'Delete Inventory Item',
        message: `Are you sure you want to delete ${item.name}?`,
        confirmButton: 'Delete'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteItem(item.id!);
      }
    });
  }

  deleteItem(id: number): void {
    this.inventoryService.deleteInventoryItem(id).subscribe({
      next: (success) => {
        if (success) {
          this.notificationService.success('Inventory item deleted successfully');
          this.loadInventory();
        } else {
          this.notificationService.error('Failed to delete inventory item');
        }
      },
      error: (error) => {
        console.error('Error deleting inventory item:', error);
        this.notificationService.error('Failed to delete inventory item. Please try again.');
      }
    });
  }
}