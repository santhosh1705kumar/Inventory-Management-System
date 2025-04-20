import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { InventoryService } from '../../services/inventory.service';
import { SupplierService } from '../../services/supplier.service';
import { NotificationService } from '../../services/notification.service';
import { CATEGORIES, Inventory } from '../../models/inventory.model';
import { Supplier } from '../../models/supplier.model';

@Component({
  selector: 'app-inventory-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  template: `
    <div class="page-header">
      <h1>{{ isEditMode ? 'Edit' : 'Add' }} Inventory Item</h1>
      <div class="action-buttons">
        <a mat-stroked-button routerLink="/inventory">
          Back to Inventory
        </a>
      </div>
    </div>

    <mat-card>
      <mat-card-content>
        <ng-container *ngIf="isLoading; else formContent">
          <div class="spinner-container">
            <mat-spinner diameter="50"></mat-spinner>
          </div>
        </ng-container>

        <ng-template #formContent>
          <form [formGroup]="inventoryForm" (ngSubmit)="onSubmit()">
            <div class="form-field-container">
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Item Name</mat-label>
                <input matInput formControlName="name" placeholder="Enter item name">
                <mat-error *ngIf="inventoryForm.get('name')?.hasError('required')">
                  Name is required
                </mat-error>
                <mat-error *ngIf="inventoryForm.get('name')?.hasError('maxlength')">
                  Name cannot exceed 255 characters
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Category</mat-label>
                <mat-select formControlName="category">
                  @for (category of categories; track category) {
                    <mat-option [value]="category">{{ category }}</mat-option>
                  }
                </mat-select>
                <mat-error *ngIf="inventoryForm.get('category')?.hasError('required')">
                  Category is required
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Quantity</mat-label>
                <input matInput formControlName="quantity" type="number" min="0">
                <mat-error *ngIf="inventoryForm.get('quantity')?.hasError('required')">
                  Quantity is required
                </mat-error>
                <mat-error *ngIf="inventoryForm.get('quantity')?.hasError('min')">
                  Quantity must be 0 or greater
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Supplier</mat-label>
                <mat-select formControlName="supplier_id">
                  @for (supplier of suppliers; track supplier.id) {
                    <mat-option [value]="supplier.id">{{ supplier.name }}</mat-option>
                  }
                </mat-select>
                <mat-error *ngIf="inventoryForm.get('supplier_id')?.hasError('required')">
                  Supplier is required
                </mat-error>
              </mat-form-field>
            </div>

            <div class="form-actions mt-16">
              <button 
                mat-raised-button 
                color="primary" 
                type="submit" 
                [disabled]="!inventoryForm.valid || isSubmitting"
              >
                <span *ngIf="isSubmitting">
                  <mat-spinner diameter="20"></mat-spinner>
                </span>
                <span *ngIf="!isSubmitting">
                  {{ isEditMode ? 'Update' : 'Create' }} Item
                </span>
              </button>
              <button mat-button type="button" (click)="goBack()">Cancel</button>
            </div>
          </form>
        </ng-template>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .form-field-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 16px;
    }
    
    .form-actions {
      display: flex;
      gap: 16px;
      margin-top: 16px;
    }
  `]
})
export class InventoryFormComponent implements OnInit {
  inventoryForm!: FormGroup;
  suppliers: Supplier[] = [];
  categories = CATEGORIES;
  isEditMode = false;
  itemId!: number;
  isLoading = true;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private inventoryService: InventoryService,
    private supplierService: SupplierService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadSuppliers();
    
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.itemId = +params['id'];
        this.loadItemDetails(this.itemId);
      } else {
        this.isLoading = false;
      }
    });
  }

  initForm(): void {
    this.inventoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
      category: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(0)]],
      supplier_id: ['', Validators.required]
    });
  }

  loadSuppliers(): void {
    this.supplierService.getSuppliers().subscribe({
      next: (data) => {
        this.suppliers = data;
      },
      error: (error) => {
        console.error('Error loading suppliers:', error);
        this.notificationService.error('Failed to load suppliers data');
      }
    });
  }

  loadItemDetails(id: number): void {
    this.isLoading = true;
    this.inventoryService.getInventoryItem(id).subscribe({
      next: (item) => {
        this.inventoryForm.patchValue({
          name: item.name,
          category: item.category,
          quantity: item.quantity,
          supplier_id: item.supplier_id
        });
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading item details:', error);
        this.notificationService.error('Failed to load item details');
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.inventoryForm.valid) {
      const itemData: Inventory = this.inventoryForm.value;
      this.isSubmitting = true;

      if (this.isEditMode) {
        this.inventoryService.updateInventoryItem(this.itemId, itemData).subscribe({
          next: () => {
            this.notificationService.success('Inventory item updated successfully');
            this.router.navigate(['/inventory']);
          },
          error: (error) => {
            console.error('Error updating item:', error);
            this.notificationService.error('Failed to update inventory item');
            this.isSubmitting = false;
          }
        });
      } else {
        this.inventoryService.addInventoryItem(itemData).subscribe({
          next: () => {
            this.notificationService.success('Inventory item added successfully');
            this.router.navigate(['/inventory']);
          },
          error: (error) => {
            console.error('Error adding item:', error);
            this.notificationService.error('Failed to add inventory item');
            this.isSubmitting = false;
          }
        });
      }
    }
  }

  goBack(): void {
    this.location.back();
  }
}