import { RestaurantDetailsType } from '@/lib/types'
import { Heart, MapPin } from 'lucide-react'
import Image from 'next/image'

const Banner = ({ restaurant }: { restaurant: RestaurantDetailsType }) => {
  return (
    <div className="">
      <div className="h-[450px] relative">
        <Image
          src={restaurant?.banner?.url}
          width={1000}
          height={300}
          className="w-full h-[450px] object-cover lg:object-fill   "
          alt="banner"
        />
        <Heart className="bg-white absolute top-5 right-5 w-9 h-9 p-2 rounded-full cursor-pointer hover:scale-110" />
      </div>
      <div className="p-5 md:px-14">
        <h2 className="text-3xl font-bold mt-2">{restaurant?.name}</h2>
        <div className="flex items-start gap-4 mt-2">
          <Image src="/star.png" width={20} height={20} alt="star" />
          <label className=" text-gray-500">4.5 (56)</label>
        </div>
        <h2 className="text-gray-500 mt-2 flex items-center gap-2">
          <MapPin />
          {restaurant?.address}
        </h2>
      </div>
    </div>
  )
}
export default Banner
