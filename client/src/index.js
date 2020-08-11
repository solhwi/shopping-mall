import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode> 
    {/* ui에 관여하진 않지만 컴파일 오류가 났을 때 도와주는 tag */}
    <App />
  </React.StrictMode>,
  document.getElementById('root')
  // div root를 find
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
