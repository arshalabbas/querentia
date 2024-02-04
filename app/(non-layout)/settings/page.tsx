"use client";
import { useAuth } from "@clerk/nextjs";

import { removeUser } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();
  const { userId } = useAuth();
  if (!userId) return null;
  const deleteHandler = async () => {
    await removeUser(userId).then(() => {
      router.push("/sign-in");
    });
  };
  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 max-sm:px-0 py-20">
      <h1 className="text-head">Settings</h1>

      <section className="mt-9 bg-base-200 p-10">
        <h1 className="text-sub-head mb-3">Danger</h1>
        <button
          className="btn btn-error"
          onClick={() =>
            (
              document.getElementById("delete-alert") as HTMLDialogElement
            )?.showModal()
          }
        >
          Delete Account
        </button>
        <dialog id="delete-alert" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Account Deleteion</h3>
            <p className="py-4">Are you sure about this decision?</p>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn btn-ghost">Cancel</button>
              </form>
              <button onClick={deleteHandler} className="btn btn-error">
                Delete
              </button>
            </div>
          </div>
        </dialog>
      </section>
    </main>
  );
}

export default Page;
