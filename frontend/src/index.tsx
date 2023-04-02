import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { StompSessionProvider } from 'react-stomp-hooks';
import { getCheckUrl, wsUrl } from './app/ws';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
        <StompSessionProvider url={wsUrl} connectHeaders={{}} logRawCommunication={true}
        debug={(str) => {
          if (str === "Opening Web Socket...") {
            console.log(`Url is ${wsUrl}`)
            console.log(getCheckUrl());
          }
          console.log(str);
        }}
        onUnhandledMessage={(val) => {
         // console.log(val)
        }}
        onStompError={(val) => {
         // console.log(val)
        }}
        onChangeState={(val) => {
        //  console.log(val)
        }}
  
        >
          <App />
        </StompSessionProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
