'use client'

import GlobalApi from '@/lib/GlobalApi'
import { ArrowLeftCircle, ArrowRightCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

type CategoryType = {
  id: string
  name: string
  slug: string
  icon: {
    url: string
  }
}

const CategoryList = () => {
  const listRef = useRef(null)

  const [categoryList, setCategoryList] = useState<CategoryType[]>([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const params = useSearchParams()

  useEffect(() => {
    setSelectedCategory(params.get('category') as string)
  }, [params])

  const getCategoryList = () => {
    GlobalApi.GetCategories().then((res: any) => {
      setCategoryList(res.categories)
    })
  }

  const scrollRightHandler = () => {
    if (listRef.current) {
      listRef.current.scrollBy({
        left: 200,
        behavior: 'smooth',
      })
    }
  }

  const scrollLeftHandler = () => {
    if (listRef.current) {
      listRef.current.scrollBy({
        left: -200,
        behavior: 'smooth',
      })
    }
  }

  useEffect(() => {
    getCategoryList()
  }, [])
  return (
    <div className="p-5 md:px-14  relative">
      <ArrowLeftCircle
        onClick={() => scrollLeftHandler()}
        className="absolute left-4  top-12 h-8 w-8 cursor-pointer"
      />
      <div className="flex gap-4 overflow-auto scrollbar-hide" ref={listRef}>
        {categoryList &&
          categoryList.map((category, index) => (
            <Link
              href={`?category=${category.slug}`}
              key={index}
              className={`flex flex-col items-center gap-2 border p-3 rounded-xl min-w-28 hover:border-primary hover:bg-orange-100 cursor-pointer group ${
                selectedCategory === category.slug &&
                'bg-orange-100 border-primary '
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
          ))}
      </div>
      <ArrowRightCircle
        onClick={() => scrollRightHandler()}
        className="absolute right-4  top-12 h-8 w-8 cursor-pointer"
      />
    </div>
  )
}
export default CategoryList
