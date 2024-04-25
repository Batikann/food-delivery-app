'use client'

import GlobalApi from '@/lib/GlobalApi'
import { useSearchParams } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'
import RestaurantItem from './RestaurantItem'
import RestaurantSkeletonItem from './RestaurantItemSkeleton'
import { CartUpdateContext } from '@/context/CartUpdateContext'

const ShopList = () => {
  const params = useSearchParams()
  const [category, setCategory] = useState('all')
  const [restaurants, setRestaurants] = useState([])
  const { filterQuery } = useContext(CartUpdateContext)
  const [loading, setLoading] = useState(true)

  const getShopList = (category_: string, name?: string) => {
    setLoading(false)
    const category = category_ ?? 'all'
    GlobalApi.GetShops(category, name).then((res: any) => {
      setRestaurants(res.restaurants)
      setLoading(true)
    })
  }

  useEffect(() => {
    params && setCategory(params.get('category') as string)
    params && getShopList(params.get('category') as string, filterQuery)
  }, [params, filterQuery])

  if (!loading) {
    return (
      <div className="p-5 md:px-14">
        <div className="flex flex-col gap-3">
          <h2 className="bg-slate-200 h-5 w-56 animate-pulse"></h2>
          <h2 className="bg-slate-200 h-5 w-20 animate-pulse"></h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 mt-4">
          {[...Array(7)].map((_, index) => (
            <RestaurantSkeletonItem key={index} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="p-5 md:px-14">
      <div>
        <h2 className="font-bold text-2xl">
          Popular {category?.toUpperCase()} Restaurants
        </h2>
        {restaurants && (
          <h2 className="font-bold text-primary">
            {restaurants.length ?? 0} Results
          </h2>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 mt-4">
        {restaurants.map((restaurant, index) => (
          <RestaurantItem key={index} restaurant={restaurant} />
        ))}
      </div>
    </div>
  )
}

export default ShopList
