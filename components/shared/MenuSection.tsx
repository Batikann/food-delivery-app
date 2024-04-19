'use client'

import {
  CartType,
  MenuSection,
  RestaurantDetailsType,
  menuItemType,
} from '@/lib/types'
import { Button } from '../ui/button'
import { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import { SquarePlus } from 'lucide-react'
import { useUser } from '@clerk/nextjs'
import GlobalApi from '@/lib/GlobalApi'
import { useToast } from '@/components/ui/use-toast'
import { CartUpdateContext } from '@/context/CartUpdateContext'

const MenuSection = ({ restaurant }: { restaurant: RestaurantDetailsType }) => {
  const { toast } = useToast()
  const [menuItemList, setMenuList] = useState<MenuSection[]>([])
  const { user } = useUser()
  const { updateCart, setUpdateCart } = useContext(CartUpdateContext)
  const filterMenu = (category: string) => {
    const result = restaurant?.menu?.filter(
      (item) => item?.category === category
    )
    setMenuList(result)
  }

  const addToCartHandler = (item: menuItemType) => {
    const data: CartType = {
      email: user?.primaryEmailAddress?.emailAddress as string,
      productName: item.name,
      productDescription: item.description,
      productImage: item.productImage.url,
      price: item.price,
      slug: restaurant.slug,
    }
    GlobalApi.addToCart(data).then(
      (resp) => {
        setUpdateCart(!updateCart)
        toast({
          title: 'Product Added Cart',
          description: 'Product Added Cart Successfully',
        })
      },
      (error) => {
        toast({
          title: 'Product Added Cart',
          description: 'Product Not Added Cart Try Again...',
        })
      }
    )
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
                  <SquarePlus
                    className="cursor-pointer"
                    onClick={() => addToCartHandler(menuItem)}
                  />
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
