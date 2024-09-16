import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import AddProduct from './components/AddProduct';
import Product from './components/DisplayProduct'; 

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Nav />} />
        <Route path='/add' element={<AddProduct />} />
        <Route path='/product/:id' element={<Product />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
