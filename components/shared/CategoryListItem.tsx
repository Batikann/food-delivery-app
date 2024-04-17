'use client'

import { CategoryType } from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'

const CategoryListItem = ({
  category,
  selectedCategory,
}: {
  category: CategoryType
  selectedCategory: String
}) => {
  return (
    <Link
      href={`?category=${category.slug}`}
      className={`flex flex-col items-center gap-2 border p-3 rounded-xl min-w-28 hover:border-primary hover:bg-orange-100 cursor-pointer group ${
        selectedCategory === category.slug && 'bg-orange-100 border-primary '
      }`}
    >
      <Image
        src={category.icon?.url}
        alt={category.name}
        width={40}
        height={40}
        className={`hover:scale-125 transition-all duration-200 ${
          selectedCategory === category.slug && 'scale-125'
        }`}
      />
      <h2 className="text-sm font-medium group-hover:text-primary">
        {category.name}
      </h2>
    </Link>
  )
}
export default CategoryListItem
