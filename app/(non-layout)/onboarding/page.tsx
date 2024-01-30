import AccountProfile from "@/components/forms/AccountProfile";

const Page = () => {
  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 max-sm:px-0 py-20">
      <h1 className="text-head max-sm:text-center">Hold a sec!</h1>
      <p className="mt-3 text-subtl max-sm:text-center">
        Complete your profile now, to use Querentia.
      </p>

      <section className="mt-9 bg-base-200 p-10">
        <AccountProfile />
      </section>
    </main>
  );
};

export default Page;