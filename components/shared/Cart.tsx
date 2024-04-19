import { CartType } from '@/lib/types'
import { X } from 'lucide-react'
import Image from 'next/image'
import { Button } from '../ui/button'

const Cart = ({ cart }: { cart: CartType[] }) => {
  const calculateCartAmount = () => {
    let total = 0
    cart.forEach((item) => {
      total = total + item.price
    })
    return total.toFixed(2)
  }

  return (
    <div>
      <h2 className="text-lg font-bold">{cart[0].restaurant.name}</h2>
      <div className="mt-5 flex flex-col gap-3">
        <h2 className="font-bold">My Order</h2>
        {cart &&
          cart.map((item, index) => (
            <div
              className="flex gap-2 justify-between items-center"
              key={index}
            >
              <Image
                src={cart[0].productImage}
                alt={cart[0].productName}
                width={50}
                height={50}
                className="h-[50px] w-[50px] rounded-lg object-cover "
              />
              <h2 className=" text-sm line-clamp-2">{item.productName}</h2>
              <p className="font-bold ">$ {item.price}</p>
              <X className="cursor-pointer  text-primary" />
            </div>
          ))}
        <Button className="bg-primary">
          Checkout $ {calculateCartAmount()}
        </Button>
      </div>
    </div>
  )
}
export default Cart
