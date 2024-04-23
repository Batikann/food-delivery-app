'use client'

import Header from '@/components/shared/Header'
import { CartUpdateContext } from '@/context/CartUpdateContext'
import { CartUpdateContextType } from '@/lib/types'
import { useState } from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [updateCart, setUpdateCart] = useState<CartUpdateContextType>()
  return (
    <div>
      <CartUpdateContext.Provider value={{ updateCart, setUpdateCart }}>
        <Header />
        {children}
      </CartUpdateContext.Provider>
    </div>
  )
}
export default Layout
