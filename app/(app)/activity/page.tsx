import { fetchUser, getActivity } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const Page = async () => {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user.id);
  const activity = await getActivity(userInfo._id);
  return (
    <>
      <h1 className="text-head">Activity</h1>

      <section className="mt-10 flex flex-col gap-5">
        {activity.length > 0 ? (
          <>
            {activity.map((activity) => (
              <Link key={activity._id} href={`/thread/${activity.parentId}`}>
                <article className="card py-7 bg-base-300">
                  <div className="flex gap-4 items-center">
                    <Image
                      src={activity.author.avatar}
                      alt="user_logo"
                      width={60}
                      height={60}
                      className="rounded-full object-cover ml-5"
                    />
                    <p className="!text-small-regular text-light-1">
                      <span className="mr-1 text-primary">
                        {activity.author.name}
                      </span>{" "}
                      answered your question
                    </p>
                  </div>
                </article>
              </Link>
            ))}
          </>
        ) : (
          <p className="text-gray-500 text-center text-lg">No activity yet</p>
        )}
      </section>
    </>
  );
};

export default Page;
