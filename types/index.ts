export interface Product {
  productId: number;
  name: string;
  image: string;
  categoryName: string;
  brandName: string;
  warehouseId: number;
  price: number;
  color: string;
  size: string;
  tax: number;
  taxType: string;
  localDiscount: number;
}

export interface ProductsState {
  items: Product[];
  currentPage: number;
  itemsPerPage: number;
}

export interface CartItem {
  productId: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
  tax: number;
  taxType: string;
  discount: number;
  subtotal: number;
  isEditingDiscount?: boolean;
}

export interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalTax: number;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
}

export interface RecentSaleProducts {
  id?: number;
  reference: string;
  customer: string;
  warehouse: string;
  amount: string;
  due: string;
  method: string;
  status: string;
}
