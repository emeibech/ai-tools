import LoginForm from './LoginForm';
// import { Button } from '@/common/components/ui/button';
// import { useAuth0 } from '@auth0/auth0-react';
// import useLoginWithGoogle from './useLoginWithGoogle';
// import { Separator } from '@/common/components/ui/separator';
// import Fallback from '../Fallback';

export default function Login() {
  // const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

  // const { reqStatus } = useLoginWithGoogle();

  return (
    <main className="grid place-items-center mt-32 2xl:mt-60">
      <section className="min-w-[300px] max-w-[600px] p-4 sm:min-w-[420px]">
        <p className="text-muted-foreground mb-4 text-lg">
          Enter your email and password.
        </p>

        <LoginForm />

        {/* {(!isAuthenticated || reqStatus === 'error') && !isLoading && (
          <>
            <p className="text-muted-foreground mb-4 text-lg">
              Enter your email and password.
            </p>

            <LoginForm />

            <section className="flex flex-col items-center mt-4 gap-4 relative">
              <Separator className="mt-8" decorative />
              <div className="absolute top-4 px-2 bg-background">
                <p className="text-xl">OR</p>
              </div>

              <Button
                onClick={async () => await loginWithRedirect()}
                className="py-3 min-w-full text-base h-auto mt-6"
              >
                Log in with Google
              </Button>
            </section>
          </>
        )} */}

        {/* {isAuthenticated && reqStatus === 'idle' && <Fallback />}
        {isAuthenticated && reqStatus === 'requesting' && <Fallback />}
        {isLoading && <Fallback />} */}
      </section>
    </main>
  );
}
