import LoginForm from './LoginForm';
import { Button } from '@/common/components/ui/button';
import { useAuth0 } from '@auth0/auth0-react';
import useLoginWithGoogle from './useLoginWithGoogle';
import { Separator } from '@/common/components/ui/separator';
import Fallback from '../Fallback';

export default function Login() {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

  const { reqStatus } = useLoginWithGoogle();

  return (
    <main className="grid place-items-center mt-32 2xl:mt-60">
      <section className="min-w-[300px] max-w-[600px] p-4 sm:min-w-[420px]">
        {(!isAuthenticated || reqStatus === 'error') && !isLoading && (
          <>
            <p className="text-muted-foreground mb-4">
              Enter your email and password.
            </p>

            <LoginForm />

            <Separator className="mt-8" />

            <section className="flex flex-col items-center mt-12 gap-4">
              <p className="text-xl">OR</p>
              <Button
                onClick={async () => await loginWithRedirect()}
                className="py-3 min-w-full text-base h-auto"
              >
                Log in using your Google account
              </Button>
            </section>
          </>
        )}

        {isAuthenticated && reqStatus === 'idle' && <Fallback />}
        {isAuthenticated && reqStatus === 'requesting' && <Fallback />}
        {isLoading && <Fallback />}
      </section>
    </main>
  );
}
