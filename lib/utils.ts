import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { ReviewType } from './types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const calculateRating = (reviews: ReviewType[]) => {
  let total = 0
  let count = 0
  let result = 0
  reviews.forEach((item) => {
    total = total + item.star
    count++
  })

  if (reviews.length <= 0) {
    return (result = 0)
  }

  return (result = total / count).toFixed(2)
}

export const calculateReviwsCount = (reviews: ReviewType[]) => {
  const reviewsLength = reviews.length
  return reviewsLength
}
