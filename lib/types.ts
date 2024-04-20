export type CategoryType = {
  id: string
  name: string
  slug: string
  icon: {
    url: string
  }
}

export type RestaurantItemType = {
  aboutUs: string
  address: string
  categories: [
    {
      icon: {
        url: string
      }
      name: string
    }
  ]
  banner: {
    url: string
  }
  slug: string
  id: string
  name: string
  restroType: string[]
  workingHours: string
  reviews: [
    {
      star: number
    }
  ]
}

export type MenuSection = {
  category: string
  id: string
  menuItem: menuItemType[]
}

export type menuItemType = {
  id: string
  name: string
  price: number
  description: string
  productImage: {
    url: string
  }
}

export type RestaurantDetailsType = {
  name: string
  aboutUs: string
  address: string
  banner: {
    url: string
  }
  categories: [{ name: string }]
  id: string
  menu: [{ category: string; id: string; menuItem: menuItemType }]
  restroType: string[]
  slug: string
  workingHours: string
}

export type CartType = {
  id: string
  price: number
  email: string
  productDescription: string
  productImage: string
  productName: string
  slug: string
  restaurant: {
    name: string
    slug: string
    banner: {
      url: string
    }
  }
}

export type AddReviewType = {
  email: string
  profileImage: string
  reviewText: string
  star: number
  userName: string
  slug: string
}

export type Review = {
  email: string
  id: string
  profileImage: string
  reviewText: string
  star: number
  userName: string
  updatedAt: string
}

export type CartUpdateContextType = {
  updateCart: boolean
  setUpdateCart: (value: boolean) => void
}
