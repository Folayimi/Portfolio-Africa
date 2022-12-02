import './App.css';
import { useState } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import ShopPage from './Components/ShopPage/ShopPage'
import ProductPage from './Components/ProductPage/ProductPage';
import PaymentPage from './Components/PaymentPage/PaymentPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<ShopPage/>}/>
        <Route path="/products/:Id" element={<ProductPage/>}/>
        <Route path="/products/payment" element={<PaymentPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
