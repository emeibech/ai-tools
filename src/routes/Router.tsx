import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '@/app/App';
import ErrorPage from './ErrorPage';
import { lazy, Suspense } from 'react';
import Fallback from './Fallback';
import { useAppSelector } from '@/app/hooks';
import { clientStatus } from '@/features/client/clientSlice';
import Home from './home/Home';

export default function Router() {
  const CodeAnalyzer = lazy(() => import('./codeanalyzer/CodeAnalyzer'));
  const ToneChanger = lazy(() => import('./tonechanger/ToneChanger'));
  const StoryGenerator = lazy(() => import('./storygenerator/StoryGenerator'));
  const Eli5 = lazy(() => import('./eli5/Eli5'));
  const Signup = lazy(() => import('./signup/Signup'));
  const Login = lazy(() => import('./login/Login'));
  const LoginSuccessful = lazy(() => import('./login/LoginSuccessful'));
  const CodingAssistant = lazy(
    () => import('./codingassistant/CodingAssistant'),
  );

  const GeneralAssistant = lazy(
    () => import('./generalassistant/GeneralAssistant'),
  );

  const { userStatus } = useAppSelector(clientStatus);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: 'codeanalyzer',
          element: (
            <Suspense fallback={<Fallback />}>
              <CodeAnalyzer />
            </Suspense>
          ),
        },
        {
          path: 'codingassistant',
          element: (
            <Suspense fallback={<Fallback />}>
              <CodingAssistant />
            </Suspense>
          ),
        },
        {
          path: 'eli5',
          element: (
            <Suspense fallback={<Fallback />}>
              <Eli5 />
            </Suspense>
          ),
        },
        {
          path: 'tonechanger',
          element: (
            <Suspense fallback={<Fallback />}>
              <ToneChanger />
            </Suspense>
          ),
        },
        {
          path: 'storygenerator',
          element: (
            <Suspense fallback={<Fallback />}>
              <StoryGenerator />
            </Suspense>
          ),
        },
        {
          path: 'generalassistant',
          element: (
            <Suspense fallback={<Fallback />}>
              <GeneralAssistant />
            </Suspense>
          ),
        },
        {
          path: 'login',
          element: (
            <Suspense fallback={<Fallback />}>
              {userStatus === 'guest' ? <Login /> : <LoginSuccessful />}
            </Suspense>
          ),
        },

        {
          path: 'signup',
          element: (
            <Suspense fallback={<Fallback />}>
              {userStatus === 'guest' ? <Signup /> : <LoginSuccessful />}
            </Suspense>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
