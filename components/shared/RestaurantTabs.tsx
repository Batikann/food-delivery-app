import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { RestaurantDetailsType } from '@/lib/types'
import MenuSection from './MenuSection'
import ReviewSection from './ReviewSection'

const RestaurantTabs = ({
  restaurant,
}: {
  restaurant: RestaurantDetailsType
}) => {
  return (
    <Tabs defaultValue="category" className="w-full">
      <TabsList>
        <TabsTrigger value="category">Category</TabsTrigger>
        <TabsTrigger value="about">About</TabsTrigger>
        <TabsTrigger value="reviews">Reviews</TabsTrigger>
      </TabsList>
      <TabsContent value="category">
        <MenuSection restaurant={restaurant} />
      </TabsContent>
      <TabsContent value="about">Change your password here.</TabsContent>
      <TabsContent value="reviews">
        <ReviewSection restaurant={restaurant} />
      </TabsContent>
    </Tabs>
  )
}
export default RestaurantTabs
