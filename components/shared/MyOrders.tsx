'use client'

import GlobalApi from '@/lib/GlobalApi'
import { OrderList } from '@/lib/types'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
import { useEffect, useState } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const MyOrders = () => {
  const [orderList, setOrderList] = useState<OrderList[]>([])
  const { user } = useUser()
  const getMyOrders = () => {
    GlobalApi.getUserOrders(
      user?.primaryEmailAddress?.emailAddress as string
    ).then((resp: any) => {
      setOrderList(resp.orders)
    })
  }

  useEffect(() => {
    user && getMyOrders()
  }, [user])
  return (
    <div>
      <h2 className="font-bold text-lg mb-5">My Orders</h2>
      <div className="flex flex-col gap-5">
        {orderList.map((order) => (
          <div className="p-3 border rounded-md" key={order.id}>
            <h2 className="font-bold border-b pb-2">
              {moment(order.createdAt).format('DD-MMM-yyyy')}
            </h2>
            <div className="flex flex-col gap-3 mt-3">
              <p className="flex items-center justify-between font-medium border-b pb-2 text-sm md:text-base">
                Order Total Amount:
                <span className="font-normal">
                  $ {order.orderAmount.toFixed(2)}
                </span>
              </p>
              <div className="pb-2 border-b text-sm md:text-base">
                <h3 className="font-medium">Address</h3>
                <p>
                  <p>
                    <span>{order.address}</span>
                  </p>
                </p>
              </div>
              <div>
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      <h3 className="font-medium text-primary text-sm md:text-base underline cursor-pointer">
                        View Order Detail
                      </h3>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col gap-4">
                        {order.orderDetail.map((item) => (
                          <div className="flex items-center justify-between">
                            <p>{item.name}</p>
                            <p>$ {item.price}</p>
                          </div>
                        ))}
                        <hr />
                        <div className="flex items-center justify-between">
                          <h2 className="font-bold">Total Order Amount</h2>
                          <p>$ {order.orderAmount.toFixed(2)}</p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default MyOrders
