import Image from 'next/image'
import { Button } from '../ui/button'
import { Search } from 'lucide-react'
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

const Header = () => {
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
      <div className="flex items-center gap-4">
        <SignedIn>
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
