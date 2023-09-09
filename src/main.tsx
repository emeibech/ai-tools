import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { store } from './app/store.ts';
import { Provider } from 'react-redux';
import Router from './routes/Router.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router />
    </Provider>
  </React.StrictMode>
);
