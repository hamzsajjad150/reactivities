import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import './app/layout/styles.css';
import 'react-calendar/dist/Calendar.css'
import App from './app/layout/App';
import reportWebVitals from './reportWebVitals';
import { store, StoreContext } from './app/stores/store';
import { BrowserRouter } from 'react-router-dom';



ReactDOM.render(
  //providing our context to our app 
  // we can either provide the context or consume the context
  // we will provide it in this case as we want to provide it to our entire app
  // the provider takes in a value property with will be the entire observable with context interface such as store
  <StoreContext.Provider value={store}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </StoreContext.Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
