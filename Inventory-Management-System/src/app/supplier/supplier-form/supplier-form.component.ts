import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SupplierService } from '../../services/supplier.service';
import { NotificationService } from '../../services/notification.service';
import { Supplier } from '../../models/supplier.model';

@Component({
  selector: 'app-supplier-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  template: `
    <div class="page-header">
      <h1>{{ isEditMode ? 'Edit' : 'Add' }} Supplier</h1>
      <div class="action-buttons">
        <a mat-stroked-button routerLink="/suppliers">
          Back to Suppliers
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
          <form [formGroup]="supplierForm" (ngSubmit)="onSubmit()">
            <div class="form-field-container">
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Supplier Name</mat-label>
                <input matInput formControlName="name" placeholder="Enter supplier name">
                <mat-error *ngIf="supplierForm.get('name')?.hasError('required')">
                  Name is required
                </mat-error>
                <mat-error *ngIf="supplierForm.get('name')?.hasError('maxlength')">
                  Name cannot exceed 255 characters
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Contact Information</mat-label>
                <input matInput formControlName="contact" placeholder="Email or phone number">
                <mat-error *ngIf="supplierForm.get('contact')?.hasError('maxlength')">
                  Contact information cannot exceed 255 characters
                </mat-error>
              </mat-form-field>
            </div>

            <div class="form-actions mt-16">
              <button 
                mat-raised-button 
                color="primary" 
                type="submit" 
                [disabled]="!supplierForm.valid || isSubmitting"
              >
                <span *ngIf="isSubmitting">
                  <mat-spinner diameter="20"></mat-spinner>
                </span>
                <span *ngIf="!isSubmitting">
                  {{ isEditMode ? 'Update' : 'Create' }} Supplier
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
export class SupplierFormComponent implements OnInit {
  supplierForm!: FormGroup;
  isEditMode = false;
  supplierId!: number;
  isLoading = true;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private supplierService: SupplierService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.initForm();
    
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.supplierId = +params['id'];
        this.loadSupplierDetails(this.supplierId);
      } else {
        this.isLoading = false;
      }
    });
  }

  initForm(): void {
    this.supplierForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
      contact: ['', Validators.maxLength(255)]
    });
  }

  loadSupplierDetails(id: number): void {
    this.isLoading = true;
    this.supplierService.getSupplier(id).subscribe({
      next: (supplier) => {
        this.supplierForm.patchValue({
          name: supplier.name,
          contact: supplier.contact
        });
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading supplier details:', error);
        this.notificationService.error('Failed to load supplier details');
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.supplierForm.valid) {
      const supplierData: Supplier = this.supplierForm.value;
      this.isSubmitting = true;

      if (this.isEditMode) {
        this.supplierService.updateSupplier(this.supplierId, supplierData).subscribe({
          next: () => {
            this.notificationService.success('Supplier updated successfully');
            this.router.navigate(['/suppliers']);
          },
          error: (error) => {
            console.error('Error updating supplier:', error);
            this.notificationService.error('Failed to update supplier');
            this.isSubmitting = false;
          }
        });
      } else {
        this.supplierService.addSupplier(supplierData).subscribe({
          next: () => {
            this.notificationService.success('Supplier added successfully');
            this.router.navigate(['/suppliers']);
          },
          error: (error) => {
            console.error('Error adding supplier:', error);
            this.notificationService.error('Failed to add supplier');
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