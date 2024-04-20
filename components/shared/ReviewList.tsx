import { Review } from '@/lib/types'
import { Rating, ThinStar } from '@smastrom/react-rating'
import Image from 'next/image'
import moment from 'moment'

const myStyles = {
  itemShapes: ThinStar,
  activeFillColor: '#ffb700',
  inactiveFillColor: '#fbf1a9',
}

const ReviewList = ({ reviews }: { reviews: Review[] }) => {
  return (
    <div className="flex flex-col gap-5">
      {reviews &&
        reviews.map((review) => (
          <div
            key={review.id}
            className="flex gap-5 items-center border rounded-md shadow-sm p-3 "
          >
            <Image
              src={review.profileImage}
              alt="profileImage"
              width={50}
              height={50}
              className="rounded-full"
            />
            <div>
              <h2>
                {`${review.userName} at
                ${moment(review.updatedAt).format('DD MMM YYYY')}`}
              </h2>
              <Rating
                style={{ maxWidth: 120 }}
                value={review.star}
                itemStyles={myStyles}
                isDisabled
              />
              <p>{review.reviewText}</p>
            </div>
          </div>
        ))}
    </div>
  )
}
export default ReviewList
