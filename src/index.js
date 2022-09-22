import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import{BrowserRouter} from 'react-router-dom'

ReactDOM.render(
  <BrowserRouter>
    <App style={{ background: "#3784db" }} />
  </BrowserRouter>,
  document.getElementById('root')
);

