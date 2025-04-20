// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable, of } from 'rxjs';
// import { Inventory, InventoryFilter } from '../models/inventory.model';
// import { environment } from '../../environments/environment';

// @Injectable({
//   providedIn: 'root'
// })
// export class InventoryService {
//   // This would normally come from environment variables
//   private apiUrl = 'http://localhost:3000/api/inventory';
  
//   // Temporary mock data until backend is implemented
//   private mockInventory: Inventory[] = [
//     { id: 1, name: 'Laptop', category: 'Electronics', quantity: 15, supplier_id: 1, supplier_name: 'Tech Solutions Inc.' },
//     { id: 2, name: 'Desk Chair', category: 'Furniture', quantity: 7, supplier_id: 2, supplier_name: 'Office Furnishings Ltd.' },
//     { id: 3, name: 'Notebooks', category: 'Office Supplies', quantity: 0, supplier_id: 3, supplier_name: 'Paper Supply Co.' },
//     { id: 4, name: 'Monitors', category: 'Electronics', quantity: 5, supplier_id: 1, supplier_name: 'Tech Solutions Inc.' },
//     { id: 5, name: 'Desk Lamps', category: 'Office Supplies', quantity: 3, supplier_id: 2, supplier_name: 'Office Furnishings Ltd.' }
//   ];

//   constructor(private http: HttpClient) { }

//   getInventoryItems(): Observable<Inventory[]> {
//     // This would be the actual API call once backend is implemented
//     // return this.http.get<Inventory[]>(this.apiUrl);
    
//     // Using mock data for now
//     return of(this.mockInventory);
//   }

//   getInventoryItem(id: number): Observable<Inventory> {
//     // This would be the actual API call once backend is implemented
//     // return this.http.get<Inventory>(`${this.apiUrl}/${id}`);
    
//     // Using mock data for now
//     const item = this.mockInventory.find(i => i.id === id);
//     return of(item as Inventory);
//   }

//   addInventoryItem(item: Inventory): Observable<Inventory> {
//     // This would be the actual API call once backend is implemented
//     // return this.http.post<Inventory>(this.apiUrl, item);
    
//     // Mock implementation
//     const newItem = { ...item, id: this.mockInventory.length + 1 };
//     this.mockInventory.push(newItem);
//     return of(newItem);
//   }

//   updateInventoryItem(id: number, item: Inventory): Observable<Inventory> {
//     // This would be the actual API call once backend is implemented
//     // return this.http.put<Inventory>(`${this.apiUrl}/${id}`, item);
    
//     // Mock implementation
//     const index = this.mockInventory.findIndex(i => i.id === id);
//     if (index !== -1) {
//       this.mockInventory[index] = { ...item, id };
//       return of(this.mockInventory[index]);
//     }
//     return of({ id: 0, name: '', category: '', quantity: 0, supplier_id: 0 });
//   }

//   deleteInventoryItem(id: number): Observable<boolean> {
//     // This would be the actual API call once backend is implemented
//     // return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
    
//     // Mock implementation
//     const index = this.mockInventory.findIndex(i => i.id === id);
//     if (index !== -1) {
//       this.mockInventory.splice(index, 1);
//       return of(true);
//     }
//     return of(false);
//   }

//   filterInventory(filter: InventoryFilter): Observable<Inventory[]> {
//     // In a real implementation, this would be a server-side filter
//     // return this.http.get<Inventory[]>(`${this.apiUrl}?category=${filter.category}&stockStatus=${filter.stockStatus}`);
    
//     // Mock implementation with client-side filtering
//     let filtered = [...this.mockInventory];
    
//     if (filter.category && filter.category !== '') {
//       filtered = filtered.filter(item => item.category === filter.category);
//     }
    
//     if (filter.stockStatus) {
//       switch (filter.stockStatus) {
//         case 'out-of-stock':
//           filtered = filtered.filter(item => item.quantity === 0);
//           break;
//         case 'low':
//           filtered = filtered.filter(item => item.quantity > 0 && item.quantity <= 5);
//           break;
//         case 'in-stock':
//           filtered = filtered.filter(item => item.quantity > 5);
//           break;
//       }
//     }
    
//     return of(filtered);
//   }
// }


import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inventory, InventoryFilter } from '../models/inventory.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private apiUrl = `${environment.apiUrl}/inventory`;

  constructor(private http: HttpClient) {}

  // Get all inventory items
  getInventoryItems(): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(this.apiUrl);
  }

  // Get a single inventory item by ID
  getInventoryItem(id: number): Observable<Inventory> {
    return this.http.get<Inventory>(`${this.apiUrl}/${id}`);
  }

  // Add a new inventory item
  addInventoryItem(item: Inventory): Observable<Inventory> {
    return this.http.post<Inventory>(this.apiUrl, item);
  }

  // Update an existing inventory item
  updateInventoryItem(id: number, item: Inventory): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, item);
  }

  // Delete an inventory item
  deleteInventoryItem(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Filter inventory items by category and stock status
  filterInventory(filter: InventoryFilter): Observable<Inventory[]> {
    let params = new HttpParams();
    if (filter.category) {
      params = params.set('category', filter.category);
    }
    if (filter.stockStatus) {
      params = params.set('stockStatus', filter.stockStatus);
    }
    return this.http.get<Inventory[]>(this.apiUrl, { params });
  }
}
