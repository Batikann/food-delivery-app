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
}
