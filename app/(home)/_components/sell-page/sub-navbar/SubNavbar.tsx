'use client'

import { Sun, RotateCcw, Maximize2, LayoutGrid } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { UserSearch } from './helpers/UserSearch'
import { ProductSearch } from './helpers/ProductSearch'

export default function SubNavbar() {
  return (
    <div className="border-b bg-background">
      <div className="flex h-14 items-center gap-4 px-4 lg:px-6 xl:px-8 2xl:px-10">
        {/* User Search Section */}
        <UserSearch />

        {/* Product Search Section */}
        <ProductSearch />

        {/* Right Icons Section */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-green-600 hover:text-green-700">
            <Sun className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-green-600 hover:text-green-700">
            <RotateCcw className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-green-600 hover:text-green-700">
            <Maximize2 className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-green-600 hover:text-green-700">
            <LayoutGrid className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}

