'use client'

import GlobalApi from '@/lib/GlobalApi'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import RestaurantItem from './RestaurantItem'
import RestaurantSkeletonItem from './RestaurantItemSkeleton'

const ShopList = () => {
  const params = useSearchParams()
  const [category, setCategory] = useState('all')
  const [restaurants, setRestaurants] = useState([])
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    params && setCategory(params.get('category') as string)
    params && getShopList(params.get('category') as string)
  }, [params])

  const getShopList = (category_: String) => {
    setLoading(false)
    GlobalApi.GetShops(category_).then((res: any) => {
      setRestaurants(res.restaurants)
      setReviews(res.reviews)
      setLoading(true)
    })
  }

  return (
    <div className="p-5 md:px-14">
      <h2 className="font-bold text-2xl">
        Popular {category?.toUpperCase()} Restaurants
      </h2>
      {restaurants && (
        <h2 className="font-bold text-primary">
          {restaurants.length ?? 0} Results
        </h2>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 mt-4">
        {loading ? (
          restaurants.map((restaurant, index) => (
            <RestaurantItem
              key={index}
              restaurant={restaurant}
              reviews={reviews}
            />
          ))
        ) : (
          <>
            <RestaurantSkeletonItem />
            <RestaurantSkeletonItem />
            <RestaurantSkeletonItem />
            <RestaurantSkeletonItem />
            <RestaurantSkeletonItem />
            <RestaurantSkeletonItem />
            <RestaurantSkeletonItem />
          </>
        )}
      </div>
    </div>
  )
}
export default ShopList
