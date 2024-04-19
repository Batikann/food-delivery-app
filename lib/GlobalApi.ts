import request, { gql } from 'graphql-request'
import { CartType } from './types'

const MASTER_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL as string

const GetCategories = async () => {
  const query = gql`
    query Categories {
      categories(first: 10) {
        id
        name
        slug
        icon {
          url
        }
      }
    }
  `

  const result = await request(MASTER_URL, query)
  return result
}

const GetShops = async (category: String) => {
  const query = gql`
    query GetShops {
      restaurants(where: { categories_some: { slug: "${category}" } }) {
        aboutUs
        address
        categories {
          icon {
            url
          }
          name
        }
        banner {
          url
        }
        slug
        id
        name
        restroType
        workingHours
      }
    }
  `

  const result = await request(MASTER_URL, query)
  return result
}

const GetRestaurantDetails = async (restaurant: string) => {
  const query = gql`
    query RestaurantDetails {
      restaurant(where: { slug: "${restaurant}" }) {
        aboutUs
        address
        banner {
          url
        }
        categories {
          name
        }
        id
        menu {
          ... on Menu {
            id
            category
            menuItem {
              ... on MenuItem {
                id
                name
                description
                price
                productImage {
                  url
                }
              }
            }
          }
        }
        restroType
        slug
        workingHours
        name
      }
    }
  `
  const result = await request(MASTER_URL, query)
  return result
}

const addToCart = async (data: CartType) => {
  const query = gql`
    mutation AddToCart {
      createUserCart(
        data: {
          price: ${data.price}
          email: "${data.email}"
          productDescription: "${data.productDescription}"
          productImage: "${data.productImage}"
          productName: "${data.productName}"
          restaurant:{connect:{slug:"${data.slug}"}}}
      ) {
        id
      }
      publishManyUserCarts(to: PUBLISHED) {
        count
      }
    }
  `
  const result = await request(MASTER_URL, query)
  return result
}

const getUserCart = async (email: string) => {
  const query = gql`
    query GetUserCart {
      userCarts(where: { email: "${email}" }) {
        id
        price
        productDescription
        productImage
        productName
        restaurant {
          banner {
            url
          }
          name
          slug
        }
      }
    }
  `
  const result = await request(MASTER_URL, query)
  return result
}

export default {
  GetCategories,
  GetShops,
  GetRestaurantDetails,
  addToCart,
  getUserCart,
}
