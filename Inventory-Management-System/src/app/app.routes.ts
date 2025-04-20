import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/inventory', pathMatch: 'full' },
  { 
    path: 'inventory',
    loadComponent: () => import('./inventory/inventory-list/inventory-list.component')
      .then(c => c.InventoryListComponent)
  },
  { 
    path: 'inventory/new',
    loadComponent: () => import('./inventory/inventory-form/inventory-form.component')
      .then(c => c.InventoryFormComponent)
  },
  { 
    path: 'inventory/edit/:id',
    loadComponent: () => import('./inventory/inventory-form/inventory-form.component')
      .then(c => c.InventoryFormComponent)
  },
  { 
    path: 'suppliers',
    loadComponent: () => import('./supplier/supplier-list/supplier-list.component')
      .then(c => c.SupplierListComponent)
  },
  { 
    path: 'suppliers/new',
    loadComponent: () => import('./supplier/supplier-form/supplier-form.component')
      .then(c => c.SupplierFormComponent)
  },
  { 
    path: 'suppliers/edit/:id',
    loadComponent: () => import('./supplier/supplier-form/supplier-form.component')
      .then(c => c.SupplierFormComponent)
  },
  { path: '**', redirectTo: '/inventory' }
];