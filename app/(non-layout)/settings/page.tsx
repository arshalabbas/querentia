"use client";
import { useAuth } from "@clerk/nextjs";

import { removeUser } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";
import AlertModal, {
  alertButtonOnClickHandler,
} from "@/components/ui/AlertModal";

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
          onClick={() => alertButtonOnClickHandler("delete-alert")}
        >
          Delete Account
        </button>
        <AlertModal
          id="delete-alert"
          title="Account Deletetion"
          body="Are you sure about this decision?"
          buttonTitle="Delete"
          successHandler={deleteHandler}
        />
      </section>
    </main>
  );
}

export default Page;
