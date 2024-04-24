import { createContext } from 'react'

export const CartUpdateContext = createContext<{
  updateCart: any
  setUpdateCart: any
}>({ updateCart: null, setUpdateCart: null })
