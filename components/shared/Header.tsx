import Image from 'next/image'
import { Button } from '../ui/button'
import { Search, ShoppingCart } from 'lucide-react'
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from '@clerk/nextjs'
import { useContext, useEffect, useState } from 'react'
import { CartUpdateContext } from '@/context/CartUpdateContext'
import GlobalApi from '@/lib/GlobalApi'

const Header = () => {
  const [cart, setCart] = useState([])
  const { user } = useUser()
  const { updateCart, setUpdateCart } = useContext(CartUpdateContext)

  useEffect(() => {
    user && getUserCart(user.primaryEmailAddress?.emailAddress as string)
  }, [updateCart, user])

  const getUserCart = (email: string) => {
    GlobalApi.getUserCart(email).then((resp) => {
      setCart(resp.userCarts)
    })
  }
  return (
    <div className="flex justify-between items-center p-5 md:px-14 border border-b ">
      <Image src="/logo.svg" width={100} height={120} alt="logo" />
      <div className="md:flex hidden border py-2 rounded-lg bg-gray-200 w-96 justify-between px-3">
        <input
          className="bg-transparent outline-none focus:outline-none w-full"
          type="text"
          placeholder="search food"
        />
        <Search size={20} className="cursor-pointer" />
      </div>
      <div className="flex items-center gap-8">
        <SignedIn>
          <div className="relative">
            <span className="absolute -top-3 -right-4 bg-slate-200 text-black font-medium flex p-[2px] px-2  rounded-full text-sm">
              {cart && cart.length}
            </span>
            <ShoppingCart />
          </div>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal">
            <Button variant="outline">Login</Button>
          </SignInButton>

          <SignUpButton>
            <Button>Register</Button>
          </SignUpButton>
        </SignedOut>
      </div>
    </div>
  )
}
export default Header
