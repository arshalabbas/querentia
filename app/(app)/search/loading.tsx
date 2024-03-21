import CardsSkeleton from "@/components/skeletons/CardsSkeleton";

const Loading = () => {
  return (
    <section>
      <h1 className="text-head">Search</h1>
      <div className="skeleton w-full h-16 my-10"></div>
      <CardsSkeleton />
    </section>
  );
};

export default Loading;
