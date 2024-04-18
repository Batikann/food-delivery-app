'use client'

import Banner from '@/components/shared/Banner'
import RestaurantTabs from '@/components/shared/RestaurantTabs'
import GlobalApi from '@/lib/GlobalApi'
import { RestaurantDetailsType } from '@/lib/types'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const Page = () => {
  const [restaurant, setRestaurant] = useState<RestaurantDetailsType>()
  const params = usePathname()
  const getRestaurantDetails = (slug: string) => {
    GlobalApi.GetRestaurantDetails(slug).then((res: any) => {
      setRestaurant(res.restaurant)
    })
  }

  useEffect(() => {
    getRestaurantDetails(params.split('/')[2])
  }, [params])
  return (
    <div className="">
      <Banner restaurant={restaurant as RestaurantDetailsType} />
      <div className="p-5 md:px-14">
        <RestaurantTabs restaurant={restaurant as RestaurantDetailsType} />
      </div>
    </div>
  )
}
export default Page
