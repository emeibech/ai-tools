import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '@/app/App';
import ErrorPage from './ErrorPage';
import Home from './home/Home';
import CodeAnalyzer from './codeanalyzer/CodeAnalyzer';
import ToneChanger from './tonechanger/ToneChanger';
import StoryGenerator from './storygenerator/StoryGenerator';
import CodingAssistant from './codingassistant/CodingAssistant';
import Eli5 from './eli5/Eli5';
import GeneralAssistant from './generalassistant/GeneralAssistant';

export default function Router() {
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
          element: <CodeAnalyzer />,
        },
        {
          path: 'codingassistant',
          element: <CodingAssistant />,
        },
        {
          path: 'eli5',
          element: <Eli5 />,
        },
        {
          path: 'tonechanger',
          element: <ToneChanger />,
        },
        {
          path: 'storygenerator',
          element: <StoryGenerator />,
        },
        {
          path: 'generalassistant',
          element: <GeneralAssistant />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
