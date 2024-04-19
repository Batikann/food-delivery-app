import { CartType } from '@/lib/types'
import { X } from 'lucide-react'
import Image from 'next/image'
import { Button } from '../ui/button'
import GlobalApi from '@/lib/GlobalApi'
import { useToast } from '../ui/use-toast'
import { useContext } from 'react'
import { CartUpdateContext } from '@/context/CartUpdateContext'

const Cart = ({ cart }: { cart: CartType[] }) => {
  const { toast } = useToast()
  const { updateCart, setUpdateCart } = useContext(CartUpdateContext)
  const calculateCartAmount = () => {
    let total = 0
    cart.forEach((item) => {
      total = total + item.price
    })
    return total.toFixed(2)
  }

  const removeItem = (id: string) => {
    GlobalApi.disconnectRestroFromUserCartItem(id).then((resp) => {
      if (resp) {
        GlobalApi.deleteCartItemFromCart(id).then((res) => {
          toast({
            title: 'Product Deleted',
            description: 'Product successfully deleted from cart',
          })
          setUpdateCart(!updateCart)
        })
      }
    })
  }

  return (
    <div>
      <h2 className="text-lg font-bold">{cart[0]?.restaurant.name}</h2>
      <div className="mt-5 flex flex-col gap-3">
        <h2 className="font-bold">My Order</h2>
        {cart &&
          cart.map((item, index) => (
            <div
              className="flex gap-2 justify-between items-center"
              key={index}
            >
              <Image
                src={item.productImage}
                alt={item.productName}
                width={50}
                height={50}
                className="h-[50px] w-[50px] rounded-lg object-cover "
              />
              <h2 className=" text-sm line-clamp-2">{item.productName}</h2>
              <p className="font-bold ">$ {item.price}</p>
              <X
                onClick={() => removeItem(item.id)}
                className="cursor-pointer  text-primary"
              />
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
