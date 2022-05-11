import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

const div = document.getElementById('app');

const root = createRoot(div!);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
