'use client'

import { redirect, useSearchParams } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { checkoutFormSchema } from '@/lib/validator'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useUser } from '@clerk/nextjs'
import GlobalApi from '@/lib/GlobalApi'
import { CartUpdateContext } from '@/context/CartUpdateContext'
import { CartType, OrderType, UserInformationForOrder } from '@/lib/types'
import { Loader } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'

const CheckoutPage = () => {
  const params = useSearchParams()
  const [cart, setCart] = useState<CartType[]>([])
  const [subTotal, setSubTotal] = useState(0)
  const { user } = useUser()
  const { updateCart, setUpdateCart } = useContext(CartUpdateContext)
  const [tax, setTax] = useState(0)
  const [total, setTotal] = useState(0)
  const [deliveryAmount] = useState(5)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof checkoutFormSchema>>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      name: '',
      email: '',
      address: '',
    },
  })

  useEffect(() => {
    user && getUserCart(user.primaryEmailAddress?.emailAddress as string)
  }, [user, updateCart])

  const getUserCart = (email: string) => {
    GlobalApi.getUserCart(email).then((resp: any) => {
      setCart(resp.userCarts)
      calculateTotalAmount(resp.userCarts)
    })
  }

  const calculateTotalAmount = (cart_: CartType[]) => {
    let total = 0
    cart_.forEach((item) => {
      total = total + item.price
    })
    setSubTotal(total as number)
    const calculatedTax = total * 0.09
    setTax(calculatedTax)
    const calculatedTotalAmount = total + deliveryAmount + calculatedTax
    setTotal(calculatedTotalAmount)
  }

  const addToOrder = (values: UserInformationForOrder) => {
    setLoading(true)
    const data = {
      email: values.email,
      orderAmount: total,
      restaurantName: params.get('restaurant'),
      address: values.address,
      phone: values.phone,
      zipCode: values.zip,
      userName: values.name,
    }

    GlobalApi.createNewOrder(data as OrderType).then(
      (resp: any) => {
        const resultId = resp.createOrder.id
        if (resultId) {
          cart.forEach((item) => {
            GlobalApi.UpdateOrderToAddOrderItems(
              item.productName,
              item.price,
              resultId,
              user?.primaryEmailAddress?.emailAddress as string
            ).then(
              (resp) => {
                setLoading(false)
                toast({
                  title: 'Order Added',
                  description: 'New Order Added Successfully',
                })
                setUpdateCart(!updateCart)
              },
              (error) => {
                setLoading(false)
              }
            )
          })
        }
      },
      (error) => {
        setLoading(false)
      }
    )
  }

  function onSubmit(values: z.infer<typeof checkoutFormSchema>) {
    addToOrder(values)
  }
  return (
    <div className="p-5 md:px-14 h-screen">
      <h2 className="text-3xl font-bold">CheckOut</h2>
      <div className="max-w-7xl mx-auto ">
        <h2 className="text-4xl font-bold mb-10">Billing Details</h2>
        <div className="w-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex md:flex-row flex-col justify-between gap-10">
                <div className="md:w-2/3 flex flex-col gap-6">
                  <div className="flex justify-between gap-4">
                    <div className="w-1/2">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Name" {...field} />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="w-1/2">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="Email" {...field} />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between gap-4">
                    <div className="w-1/2">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <Input placeholder="Phone" {...field} />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="w-1/2">
                      <FormField
                        control={form.control}
                        name="zip"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Zip</FormLabel>
                            <FormControl>
                              <Input placeholder="Zip" {...field} />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Address" {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="md:w-1/3">
                  <div className="border">
                    <h2 className="bg-slate-200 p-3 text-xl font-bold text-center">
                      Total Cart
                    </h2>
                    <div className="p-5 flex flex-col gap-3">
                      <div className="flex justify-between items-center border-b pb-2">
                        <h3 className="font-bold text-lg">Subtotal:</h3>
                        <p>$ {subTotal}</p>
                      </div>
                      <div className="border-b pb-2 flex flex-col gap-4">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium text-md">Delivery:</h3>
                          <p>$ {deliveryAmount}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-md">Tax (9%):</h3>
                          <p>$ {tax.toFixed(2)}</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <h3 className="font-bold text-lg">Total</h3>
                        <p>$ {total.toFixed(2)}</p>
                      </div>
                      <div className="w-full">
                        <Button type="submit" className="w-full">
                          {loading ? (
                            <Loader className="animate-spin" />
                          ) : (
                            'Make Payment'
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}
export default CheckoutPage
