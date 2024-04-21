import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { ReviewType } from './types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const calculateRating = (reviews: ReviewType[]) => {
  let total = 0
  let count = 0
  reviews.forEach((item) => {
    total = total + item.star
    count++
  })

  const result = total / count
  return result.toFixed(2)
}

export const calculateReviwsCount = (reviews: ReviewType[]) => {
  const reviewsLength = reviews.length
  return reviewsLength
}
