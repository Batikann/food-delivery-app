'use client'

import MyOrders from '@/components/shared/MyOrders'
import { UserButton, UserProfile } from '@clerk/nextjs'
import { ShoppingBag } from 'lucide-react'

const UserPage = () => {
  return (
    <div className="p-6 md:px-14 flex justify-center items-center">
      <UserProfile>
        <UserButton.UserProfilePage
          label="My Orders"
          labelIcon={<ShoppingBag className="w-5 h-5" />}
          url="my-orders"
        >
          <MyOrders />
        </UserButton.UserProfilePage>
      </UserProfile>
    </div>
  )
}
export default UserPage
