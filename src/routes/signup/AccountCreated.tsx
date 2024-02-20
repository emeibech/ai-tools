import Loading from '@/common/components/custom/Loading';

export default function AccountCreated() {
  return (
    <section className="grid place-items-center mt-32 2xl:mt-60">
      <h3 className="text-2xl sm:text-5xl text-center">Account created!</h3>
      <h2 className="text-lg sm:text-3xl text-center">
        You will soon be redirected to the login page.
      </h2>
      <Loading />
    </section>
  );
}
