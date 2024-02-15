import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";

async function Page() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) redirect("/onboarding");

  // fetch users
  const result = await fetchUsers({
    userId: user.id,
    searchString: "",
    pageNumber: 1,
    pageSize: 25,
  });

  return (
    <section>
      <h1 className="text-head mb-10">Search</h1>

      {/* Searchbar */}

      <div className="mt-14 flex gap-9">
        {result.users.length === 0 ? (
          <p className="no-result">No users!</p>
        ) : (
          <>
            {result.users.map((person) => (
              <div className="card w-96 max-xs:flex-col bg-base-100 shadow-md">
                <div className="card-body">
                  <Image
                    src={person.avatar}
                    width={60}
                    height={60}
                    alt="user-avatar"
                  />
                  <div>
                    <h2 className="card-title">{person.name}</h2>
                    <p>@{person.username}</p>
                  </div>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary">View</button>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </section>
  );
}

export default Page;
