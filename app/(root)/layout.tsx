'use client'

import Header from '@/components/shared/Header'
import { CartUpdateContext } from '@/context/CartUpdateContext'
import { useState } from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [updateCart, setUpdateCart] = useState()
  const [filterQuery, setFilterQuery] = useState<string>('')
  return (
    <div>
      <CartUpdateContext.Provider
        value={{ updateCart, setUpdateCart, filterQuery, setFilterQuery }}
      >
        <Header />
        {children}
      </CartUpdateContext.Provider>
    </div>
  )
}
export default Layout
