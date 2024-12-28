"use client";

import { useDispatch, useSelector } from "react-redux";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import { setProducts, setCurrentPage } from "@/redux/slices/products.slice";
import { Product } from "@/types";
import { addToCart } from "@/redux/slices/cart.slice";
import {
  setWarehouseFilter,
  setCategoryFilter,
  setBrandFilter,
} from "@/redux/slices/filters.slice";

import type { RootState } from "@/redux/store";

const WAREHOUSES = [101, 102, 103, 104, 105];
const CATEGORIES = [
  "Laptop",
  "Smart Phone",
  "Electronics",
  "Accessories",
  "Hardware",
];
const BRANDS = ["Samsung", "Apple", "Lenovo", "ASUS", "OnePlus"];

export function Products() {
  const dispatch = useDispatch();
  const { items, currentPage, itemsPerPage } = useSelector(
    (state: RootState) => state.products
  );
  const filters = useSelector((state: RootState) => state.filters);

  const filteredProducts = items.filter((product) => {
    if (filters.warehouseId && product.warehouseId !== filters.warehouseId)
      return false;
    if (filters.categoryName && product.categoryName !== filters.categoryName)
      return false;
    if (filters.brandName && product.brandName !== filters.brandName)
      return false;
    return true;
  });

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div className="w-1/2 p-4 border border-gray-200 dark:border-gray-600 rounded-md">
      <div className="flex gap-4 mb-6">
        <Select
          onValueChange={(value) =>
            dispatch(setWarehouseFilter(value === "all" ? null : Number(value)))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Choose warehouse..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Warehouses</SelectItem>
            {WAREHOUSES.map((id) => (
              <SelectItem key={id} value={String(id)}>
                Warehouse {id}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          onValueChange={(value) =>
            dispatch(setCategoryFilter(value === "all" ? null : value))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select category..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {CATEGORIES.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          onValueChange={(value) =>
            dispatch(setBrandFilter(value === "all" ? null : value))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select brand..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Brands</SelectItem>
            {BRANDS.map((brand) => (
              <SelectItem key={brand} value={brand}>
                {brand}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {paginatedProducts?.length === 0 && (
          <p className="text-center ">No products found.</p>
        )}
        {paginatedProducts?.map((product: Product) => (
          <div
            key={product.productId}
            className="relative border rounded-lg p-4 cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200 ease-in-out"
            onClick={() =>
              dispatch(
                addToCart({
                  productId: product.productId,
                  name: product.name,
                  image: product.image,
                  price: product.price,
                  quantity: 1,
                  tax: product.tax,
                  taxType: product.taxType,
                  discount: product.localDiscount,
                  subtotal: product.price,
                })
              )
            }
          >
            <span className="absolute top-1 right-1 text-xs text-gray-400">
              {product.productId}
            </span>
            <img
              src={product.image}
              alt={product.name}
              width={200}
              height={200}
              className="w-full h-40 object-cover mb-4"
            />
            <h3 className="font-semibold mb-2">{product.name}</h3>
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm text-gray-600 ">{product.brandName}</p>
              <p className="text-sm text-gray-600 ">{product.categoryName}</p>
            </div>

            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500">{product.color}</span>
              <span className="text-sm text-gray-500">{product.size}</span>
            </div>

            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500">Tax:{product.tax}%</span>
              <span className="font-bold text-xs">{product.taxType}</span>
            </div>

            <div className="flex justify-between items-center mb-2">
              <span className="font-bold">€{product.price}</span>
              <span className="text-sm text-gray-500">
                {product.localDiscount}% off
              </span>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i + 1}
              variant={currentPage === i + 1 ? "default" : "outline"}
              onClick={() => dispatch(setCurrentPage(i + 1))}
            >
              {i + 1}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
