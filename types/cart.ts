export interface Product {
    productId: number
    name: string
    image: string
    categoryName: string
    brandName: string
    warehouseId: number
    price: number
    color: string
    size: string
    tax: number
    taxType: string
    localDiscount: number
    quantity?: number
    discount?: number
  }
  
  export interface CartTotals {
    totalQty: number
    totalTax: number
    subTotal: number
    total: number
    discount: number
    shipping: number
  }
  
  export interface PaymentDetails {
    receivedAmount: number
    payingAmount: number
    paymentType: 'cash' | 'due'
    paymentStatus: string
    dueAmount: number
    changeReturn: number
    notes: string
    salesDate: string
    totalProducts: number
    totalAmount: number
    discount: number
    shipping: number
    grandTotal: number
  }
  
  