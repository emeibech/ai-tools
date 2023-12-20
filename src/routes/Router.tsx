import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '@/app/App';
import ErrorPage from './ErrorPage';
import { lazy, Suspense } from 'react';
import Fallback from './Fallback';

export default function Router() {
  const Home = lazy(() => import('./home/Home'));
  const CodeAnalyzer = lazy(() => import('./codeanalyzer/CodeAnalyzer'));
  const ToneChanger = lazy(() => import('./tonechanger/ToneChanger'));
  const StoryGenerator = lazy(() => import('./storygenerator/StoryGenerator'));
  const Eli5 = lazy(() => import('./eli5/Eli5'));
  const CodingAssistant = lazy(
    () => import('./codingassistant/CodingAssistant'),
  );

  const GeneralAssistant = lazy(
    () => import('./generalassistant/GeneralAssistant'),
  );

  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/',
          element: (
            <Suspense fallback={<Fallback />}>
              <Home />
            </Suspense>
          ),
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
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
