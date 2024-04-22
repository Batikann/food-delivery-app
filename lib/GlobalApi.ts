import request, { gql } from 'graphql-request'
import { AddReviewType, CartType, OrderType } from './types'

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
      reviews {
        star
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
      reviews {
        star
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

const disconnectRestroFromUserCartItem = async (id: string) => {
  const query = gql`
    mutation DisconnectRestaurantFromCartItem {
      updateUserCart(
        data: { restaurant: { disconnect: true } }
        where: { id: "${id}" }
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

const deleteCartItemFromCart = async (id: string) => {
  const query = gql`
    mutation DeleteCartItem {
      deleteUserCart(where: { id: "${id}" }) {
        id
      }
    }
  `
  const result = await request(MASTER_URL, query)
  return result
}

const addNewReview = async (data: AddReviewType) => {
  const query = gql`
    mutation AddNewReview {
      createReview(
        data: {
          email: "${data.email}"
          profileImage: "${data.profileImage}"
          reviewText: "${data.reviewText}"
          star: ${data.star}
          userName: "${data.userName}"
          restaurant: { connect: { slug: "${data.slug}" } }
        }
      ) {
        id
      }
      publishManyReviews(to: PUBLISHED) {
        count
      }
    }
  `
  const result = await request(MASTER_URL, query)
  return result
}

const getReviews = async (slug: string) => {
  const query = gql`
    query RestaurantReviews {
      reviews(where: { restaurant: { slug: "${slug}" } },orderBy: publishedAt_DESC) {
        email
        id
        profileImage
        reviewText
        star
        userName
        updatedAt
      }
    }
  `
  const result = await request(MASTER_URL, query)
  return result
}

const createNewOrder = async (data: OrderType) => {
  const query = gql`
    mutation CreateNewOrder {
      createOrder(
        data: {
          email: "${data.email}"
          userName: "${data.userName}"
          restaurantName: "${data.restaurantName}"
          orderAmount: ${data.orderAmount}
          address: "${data.address}"
          zipCode: "${data.zipCode}"
          phone: "${data.phone}"
        }
      ) {
        id
      }
    }
  `

  const result = await request(MASTER_URL, query)
  return result
}

const UpdateOrderToAddOrderItems = async (
  name: string,
  price: number,
  id: string,
  email: string
) => {
  const query = gql`
    mutation MyMutation {
      updateOrder(
        data: {
          orderDetail: {
            create: { OrderItem: { data: { name: "${name}}", price: ${price} } } }
          }
        }
        where: { id: "${id}" }
      ) {
        id
      }
      publishManyOrders(to: PUBLISHED) {
        count
      }
      deleteManyUserCarts(where: { email: "${email}" }) {
        count
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
  disconnectRestroFromUserCartItem,
  deleteCartItemFromCart,
  addNewReview,
  getReviews,
  createNewOrder,
  UpdateOrderToAddOrderItems,
}
