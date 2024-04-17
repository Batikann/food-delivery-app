const RestaurantSkeletonItem = () => {
  return (
    <div>
      <div className="h-[200px] w-full bg-slate-200 rounded-xl animate-pulse"></div>
      <div className="w-36 h-5 bg-slate-200 animate-pulse mt-3 "></div>
      <div>
        <div className="flex items-center justify-between mt-3">
          <div className="flex gap-2">
            <div className="h-4 w-4 bg-slate-200 animate-pulse"></div>
            <div className="h-4 w-10 bg-slate-200 animate-pulse"></div>
          </div>
          <div className="h-4 w-20 bg-slate-200 animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}
export default RestaurantSkeletonItem
