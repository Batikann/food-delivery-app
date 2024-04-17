'use client'

import GlobalApi from '@/lib/GlobalApi'
import { ArrowLeftCircle, ArrowRightCircle } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import CategoryListItem from './CategoryListItem'
import { CategoryType } from '@/lib/types'

const CategoryList = () => {
  const listRef = useRef<HTMLDivElement>(null)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [categoryList, setCategoryList] = useState<CategoryType[]>([])

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
            <CategoryListItem
              category={category}
              key={index}
              selectedCategory={selectedCategory}
            />
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
