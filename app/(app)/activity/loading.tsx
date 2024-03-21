import CardsSkeleton from "@/components/skeletons/CardsSkeleton";

const Loading = () => {
  return (
    <div>
      <h1 className="text-head">Activity</h1>
      <CardsSkeleton />
    </div>
  );
};

export default Loading;
