import { createContext } from 'react'

export const CartUpdateContext = createContext<{
  updateCart: any
  setUpdateCart: any
  filterQuery: any
  setFilterQuery: any
}>({
  updateCart: null,
  setUpdateCart: null,
  filterQuery: null,
  setFilterQuery: null,
})
