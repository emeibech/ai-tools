import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { store } from './app/store.ts';
import { Provider } from 'react-redux';
import Router from './routes/Router.tsx';
import { Auth0Provider } from '@auth0/auth0-react';

const domain = import.meta.env.VITE_DOMAIN;
const cliendId = import.meta.env.VITE_CLIENT_ID;
const redirectUri = import.meta.env.VITE_REDIRECT_URI;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={cliendId}
      authorizationParams={{
        redirect_uri: redirectUri,
      }}
    >
      <Provider store={store}>
        <Router />
      </Provider>
    </Auth0Provider>
  </React.StrictMode>,
);
