import { Tabs, TabsList, TabsTrigger } from '@/common/components/ui/tabs';
import LoginForm from './LoginForm';
import { TabsContent } from '@radix-ui/react-tabs';
import { cn } from '@/common/lib/utils';

export default function Login() {
  return (
    <main className="grid place-items-center mt-32 2xl:mt-60">
      <section>
        <Tabs
          className={cn('min-w-[300px] max-w-[600px]', 'p-4 sm:min-w-[420px]')}
          defaultValue="password"
        >
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="passwordless">Sign in with Email</TabsTrigger>
            <TabsTrigger value="password">Sign in to account</TabsTrigger>
          </TabsList>
          <section className="py-4 px-2 rounded-md">
            <TabsContent value="passwordless" className="flex flex-col gap-8">
              <p className="text-muted-foreground">
                Enter your email and check your inbox for the OTP.
              </p>
            </TabsContent>
            <TabsContent value="password" className="flex flex-col gap-8">
              <p className="text-muted-foreground">
                Enter your email and password to sign in.
              </p>

              <LoginForm />
            </TabsContent>
          </section>
        </Tabs>
      </section>
    </main>
  );
}
