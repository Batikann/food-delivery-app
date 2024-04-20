'use client'

import { RestaurantDetailsType, Review, ReviewType } from '@/lib/types'
import { Textarea } from '../ui/textarea'
import { Rating, ThinStar } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { useUser } from '@clerk/nextjs'
import GlobalApi from '@/lib/GlobalApi'
import { useToast } from '../ui/use-toast'
import ReviewList from './ReviewList'

const myStyles = {
  itemShapes: ThinStar,
  activeFillColor: '#ffb700',
  inactiveFillColor: '#fbf1a9',
}

const ReviewSection = ({
  restaurant,
}: {
  restaurant: RestaurantDetailsType
}) => {
  const [rating, setRating] = useState<Number>(0)
  const [reviewText, setReviewText] = useState('')
  const [reviews, setReviews] = useState<Review[]>([])
  const { user } = useUser()
  const { toast } = useToast()
  const handleSubmit = () => {
    const data = {
      email: user?.primaryEmailAddress?.emailAddress,
      profileImage: user?.imageUrl,
      userName: user?.fullName,
      star: rating,
      reviewText: reviewText,
      slug: restaurant.slug,
    }
    GlobalApi.addNewReview(data as ReviewType).then((resp) => {
      toast({
        title: 'New Review',
        description: 'New Review Added Successfully',
      })
      resp && getReviewList()
    })
    setReviewText('')
    setRating(0)
  }

  const getReviewList = () => {
    GlobalApi.getReviews(restaurant?.slug).then((resp) => {
      setReviews(resp.reviews)
    })
  }

  useEffect(() => {
    getReviewList()
  }, [restaurant])

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-4 p-3">
        <h2 className="font-bold text-lg">Add your review</h2>
        <Rating
          style={{ maxWidth: 150 }}
          value={rating as number}
          onChange={setRating}
          itemStyles={myStyles}
        />
        <Textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />
        <div className="flex justify-end">
          <Button
            disabled={reviewText && rating ? false : true}
            onClick={() => handleSubmit()}
          >
            Submit
          </Button>
        </div>
      </div>
      <div className="col-span-2">
        <ReviewList reviews={reviews} />
      </div>
    </div>
  )
}
export default ReviewSection
