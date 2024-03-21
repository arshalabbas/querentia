const ProfileSkeleton = () => {
  return (
    <div>
      <div className="flex flex-col gap-5">
        <div className="skeleton w-20 h-20 rounded-full"></div>
        <div className="flex flex-col gap-3">
          <div className="skeleton w-96 h-"></div>
          <div className="skeleton w-48 h-8"></div>
        </div>
        <div className="skeleton w-full h-16"></div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
