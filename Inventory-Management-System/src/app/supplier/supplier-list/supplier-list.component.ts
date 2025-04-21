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
import { SupplierService } from '../../services/supplier.service';
import { NotificationService } from '../../services/notification.service';
import { Supplier } from '../../models/supplier.model';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-supplier-list',
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
    MatSnackBarModule
  ],
  template: `
    <div class="page-header">
      <h1>Supplier Management</h1>
      <div class="action-buttons">
        <a mat-raised-button color="primary" routerLink="/suppliers/new">
          <mat-icon>add</mat-icon>
          Add New Supplier
        </a>
      </div>
    </div>

    <ng-container *ngIf="isLoading; else content">
      <div class="spinner-container">
        <mat-spinner diameter="50"></mat-spinner>
      </div>
    </ng-container>

    <ng-template #content>
      <div *ngIf="suppliers.length === 0" class="no-data">
        <mat-card>
          <mat-card-content class="text-center">
            <p>No suppliers found. Add some suppliers to get started.</p>
            <a mat-raised-button color="accent" routerLink="/suppliers/new">Add Supplier</a>
          </mat-card-content>
        </mat-card>
      </div>

      <div *ngIf="suppliers.length > 0">
        <table mat-table [dataSource]="paginatedSuppliers" matSort (matSortChange)="sortData($event)" class="full-width">
          <!-- ID Column -->
          <ng-container matColumnDef="id">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>ID</th>
            <td mat-cell *matCellDef="let supplier">{{supplier.id}}</td>
          </ng-container>

          <!-- Name Column -->
          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Name</th>
            <td mat-cell *matCellDef="let supplier">{{supplier.name}}</td>
          </ng-container>

          <!-- Contact Column -->
          <ng-container matColumnDef="contact">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Contact</th>
            <td mat-cell *matCellDef="let supplier">{{supplier.contact || 'N/A'}}</td>
          </ng-container>

          <!-- Inventory Count Column -->
          <!-- <ng-container matColumnDef="inventory_count">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Inventory Items</th>
            <td mat-cell *matCellDef="let supplier">{{supplier.inventory_count || 0}}</td>
          </ng-container> -->

          <!-- Actions Column -->
          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef>Actions</th>
            <td mat-cell *matCellDef="let supplier">
              <div class="action-buttons">
                <a mat-icon-button color="primary" [routerLink]="['/suppliers/edit', supplier.id]" title="Edit">
                  <mat-icon>edit</mat-icon>
                </a>
                <button mat-icon-button color="warn" (click)="openDeleteDialog(supplier)" title="Delete" [disabled]="supplier.inventory_count! > 0">
                  <mat-icon>delete</mat-icon>
                </button>
              </div>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;" class="supplier-row"></tr>
        </table>

        <mat-paginator
          [length]="suppliers.length"
          [pageSize]="pageSize"
          [pageSizeOptions]="[5, 10, 25, 100]"
          (page)="onPageChange($event)"
          aria-label="Select page">
        </mat-paginator>
      </div>
    </ng-template>
  `,
  styles: [`
    .supplier-row {
      cursor: pointer;
    }
    
    .supplier-row:hover {
      background-color: rgba(0, 0, 0, 0.04);
    }
    
    .no-data {
      margin: 20px 0;
    }
  `]
})
export class SupplierListComponent implements OnInit {
  suppliers: Supplier[] = [];
  paginatedSuppliers: Supplier[] = [];
  displayedColumns: string[] = ['id', 'name', 'contact',  'actions'];
  isLoading = true;
  
  // Pagination
  pageIndex = 0;
  pageSize = 10;
  
  constructor(
    private supplierService: SupplierService,
    private notificationService: NotificationService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadSuppliers();
  }

  loadSuppliers(): void {
    this.isLoading = true;
    this.supplierService.getSuppliers().subscribe({
      next: (data) => {
        this.suppliers = data;
        this.updatePaginatedItems();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching suppliers:', error);
        this.notificationService.error('Failed to load suppliers. Please try again.');
        this.isLoading = false;
      }
    });
  }

  sortData(sort: Sort): void {
    if (!sort.active || sort.direction === '') {
      this.suppliers = [...this.suppliers];
      this.updatePaginatedItems();
      return;
    }

    this.suppliers = this.suppliers.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id': return this.compare(a.id, b.id, isAsc);
        case 'name': return this.compare(a.name, b.name, isAsc);
        case 'contact': return this.compare(a.contact, b.contact, isAsc);
        // case 'inventory_count': return this.compare(a.inventory_count, b.inventory_count, isAsc);
        default: return 0;
      }
    });
    
    this.updatePaginatedItems();
  }

  compare(a: any, b: any, isAsc: boolean): number {
    if (a === undefined && b === undefined) return 0;
    if (a === undefined) return isAsc ? -1 : 1;
    if (b === undefined) return isAsc ? 1 : -1;
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedItems();
  }

  updatePaginatedItems(): void {
    const startIndex = this.pageIndex * this.pageSize;
    this.paginatedSuppliers = this.suppliers.slice(startIndex, startIndex + this.pageSize);
  }

  openDeleteDialog(supplier: Supplier): void {
    // if (supplier.inventory_count && supplier.inventory_count > 0) {
    //   this.notificationService.warning(`Cannot delete supplier "${supplier.name}" because it has ${supplier.inventory_count} inventory items assigned to it.`);
    //   return;
    // }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: 'Delete Supplier',
        message: `Are you sure you want to delete ${supplier.name}?`,
        confirmButton: 'Delete'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteSupplier(supplier.id!);
      }
    });
  }

  deleteSupplier(id: number): void {
    this.supplierService.deleteSupplier(id).subscribe({
      next: (success) => {
        if (success) {
          this.notificationService.success('Supplier deleted successfully');
          this.loadSuppliers();
        } else {
          this.notificationService.error('Failed to delete supplier');
        }
      },
      error: (error) => {
        console.error('Error deleting supplier:', error);
        this.notificationService.error('Failed to delete supplier. Please try again.');
      }
    });
  }
}