import { BrowserRouter } from 'react-router-dom';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './App';

const div = document.getElementById('app');

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  div,
);
