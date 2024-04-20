import { RestaurantItemType } from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'

const RestaurantItem = ({ restaurant }: { restaurant: RestaurantItemType }) => {
  console.log(restaurant)

  const calculateRating = (restaurant: RestaurantItemType) => {
    let total = 0
    let count = 0
    restaurant?.reviews?.forEach((item) => {
      total = total + item.star
      count++
    })

    const result = total / count
    return result
  }

  return (
    <Link
      href={`/restaurant/${restaurant.slug}`}
      className="p-3 hover:scale-105 cursor-pointer"
    >
      <Image
        src={restaurant?.banner?.url}
        alt={restaurant.name}
        width={500}
        height={200}
        className="h-[200px] rounded-xl object-cover"
      />
      <div className="mt-2">
        <h2 className="text-lg font-bold">{restaurant.name}</h2>
        <div className="flex justify-between items-center">
          <div className="flex gap-x-2 items-center">
            <Image src="/star.png" alt="star" width={14} height={14} />
            <label className="text-gray-400">
              {calculateRating(restaurant)}
            </label>
            <h2 className="text-gray-400 text-sm">
              {restaurant.restroType[0]}
            </h2>
          </div>
          <h2 className="text-sm text-primary font-medium">
            {restaurant.categories[0].name}
          </h2>
        </div>
      </div>
    </Link>
  )
}
export default RestaurantItem
