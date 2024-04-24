import Image from 'next/image'
import { Button } from '../ui/button'
import { Search, ShoppingCart } from 'lucide-react'
import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  useUser,
} from '@clerk/nextjs'
import { useContext, useEffect, useState } from 'react'
import { CartUpdateContext } from '@/context/CartUpdateContext'
import GlobalApi from '@/lib/GlobalApi'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import Cart from './Cart'
import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const Header = () => {
  const [cart, setCart] = useState([])
  const { user } = useUser()
  const { updateCart, setUpdateCart } = useContext(CartUpdateContext)

  useEffect(() => {
    user && getUserCart(user.primaryEmailAddress?.emailAddress as string)
  }, [updateCart, user])

  const getUserCart = (email: string) => {
    GlobalApi.getUserCart(email).then((resp: any) => {
      setCart(resp.userCarts)
    })
  }
  return (
    <div className="flex justify-between items-center p-5 md:px-14 border border-b ">
      <Link href="/">
        <Image src="/logo.svg" width={100} height={120} alt="logo" />
      </Link>
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
          <div className="flex items-center gap-8">
            <Popover>
              <PopoverTrigger asChild>
                <div className="relative cursor-pointer">
                  <span className="absolute -top-3 -right-4 bg-slate-200 text-black font-medium flex p-[2px] px-2  rounded-full text-sm">
                    {cart && cart.length}
                  </span>
                  <ShoppingCart />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-full">
                <Cart cart={cart} />
              </PopoverContent>
            </Popover>

            {/* <UserButton afterSignOutUrl="/" /> */}

            <DropdownMenu>
              <DropdownMenuTrigger>
                <Image
                  src={user?.imageUrl!}
                  alt="avatar"
                  width={35}
                  height={35}
                  className="rounded-full"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/user">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  {' '}
                  <Link href="/user#/my-orders">My Orders</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <SignOutButton>Logout</SignOutButton>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
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
