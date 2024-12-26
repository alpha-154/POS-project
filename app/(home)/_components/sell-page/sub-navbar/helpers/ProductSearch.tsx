'use client'

import { useState } from 'react'
import { Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'

// Import product data
const productData = [
  {
    productId: 101,
    name: "Laptop",
    image: "laptop.jpg",
    categoryName: "Laptop",
    brandName: "TechBrand",
    warehouseId: 1,
    price: 1200,
    color: "Silver",
    size: "15.6-inch",
    tax: 10,
    taxType: "Included",
    localDiscount: 5
  },
  {
    productId: 102,
    name: "Smart Phone",
    image: "smartphone.jpg",
    categoryName: "Smartphone",
    brandName: "SmartTech",
    warehouseId: 2,
    price: 800,
    color: "Black",
    size: "6.1-inch",
    tax: 8,
    taxType: "Excluded",
    localDiscount: 10
  }
]

export function ProductSearch() {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const filteredProducts = productData.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="relative flex-1">
      <div className="relative">
        <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
        <Input
          type="text"
          placeholder="Scan/Search Product by Barcode or Name"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(true)
          }}
          className={`pl-8 ${query.length > 1 ? 'pr-8' : ''} w-full`}
          onFocus={() => setIsOpen(true)}
        />
        {query.length > 1 && (
          <button
            onClick={() => {
              setQuery('')
              setIsOpen(false)
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Search Results */}
      {isOpen && query && (
        <Card className="absolute z-50 mt-1 w-full max-h-[300px] overflow-auto">
          <ul className="py-2">
            {filteredProducts.map(product => (
              <li
                key={product.productId}
                className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                onClick={() => {
                  setQuery(product.name)
                  setIsOpen(false)
                }}
              >
                <div className="flex items-center justify-between">
                  <span>{product.name}</span>
                  <span className="text-sm text-gray-500">${product.price}</span>
                </div>
                <div className="text-sm text-gray-500">
                  {product.brandName} - {product.categoryName}
                </div>
              </li>
            ))}
            {filteredProducts.length === 0 && (
              <li className="px-4 py-2 text-gray-500">No products found</li>
            )}
          </ul>
        </Card>
      )}
    </div>
  )
}

