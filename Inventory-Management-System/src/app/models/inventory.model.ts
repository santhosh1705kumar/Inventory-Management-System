export interface Inventory {
  id?: number;
  name: string;
  category: string;
  quantity: number;
  supplier_id: number;
  supplier_name?: string;
  created_at?: Date;
}

export interface InventoryFilter {
  category?: string;
  stockStatus?: 'low' | 'in-stock' | 'out-of-stock' | '';
}

export enum StockStatus {
  LOW = 'low',
  IN_STOCK = 'in-stock',
  OUT_OF_STOCK = 'out-of-stock'
}

export const CATEGORIES = [
'Clothing', 'Accessories', 'Footwear',
'Other'
];