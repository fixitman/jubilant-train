import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { StoreProvider } from 'easy-peasy'
import store from './store'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <StoreProvider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<App/>} />
        </Routes>
      </BrowserRouter>      
    </StoreProvider>
  
);


