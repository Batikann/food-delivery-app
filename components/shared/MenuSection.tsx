'use client'

import { MenuSection, RestaurantDetailsType, menuItemType } from '@/lib/types'
import { Button } from '../ui/button'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { SquarePlus } from 'lucide-react'

const MenuSection = ({ restaurant }: { restaurant: RestaurantDetailsType }) => {
  const [menuItemList, setMenuList] = useState<MenuSection[]>([])

  const filterMenu = (category: string) => {
    const result = restaurant?.menu?.filter(
      (item) => item?.category === category
    )
    setMenuList(result)
    console.log(result[0])
  }

  useEffect(() => {
    restaurant?.menu && filterMenu(restaurant?.menu[0].category)
  }, [restaurant])
  return (
    <div>
      <div className="grid grid-cols-4 mt-4">
        <div className="hidden md:flex flex-col mr-10 gap-2">
          {restaurant?.menu.map((menu) => (
            <Button
              key={menu?.id}
              onClick={() => filterMenu(menu?.category as string)}
              variant={'ghost'}
              className="flex justify-start"
            >
              {menu?.category}
            </Button>
          ))}
        </div>
        <div className="md:col-span-3 col-span-4">
          <h2 className="font-extrabold text-lg">
            {menuItemList[0]?.category}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-4 ">
            {menuItemList[0]?.menuItem?.map((menuItem) => (
              <div className="flex gap-4 border rounded-md p-3 hover:border-primary cursor-pointer ">
                <Image
                  src={menuItem?.productImage.url}
                  alt="menu banner"
                  width={200}
                  height={120}
                  className="object-cover w-[120px] h-full rounded-md"
                />
                <div className="flex flex-col gap-2">
                  <h2 className="font-bold">{menuItem.name}</h2>
                  <h2>{menuItem.price}$</h2>
                  <p className="text-sm text-gray-400 line-clamp-2">
                    {menuItem.description}
                  </p>
                  <SquarePlus />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
export default MenuSection
