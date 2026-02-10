import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom";
import HomePage from './pages/home/HomePage';
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import LoginScreen from './store/auth/LoginScreen';
import RegisterUserScreen from './store/auth/RegisterUserScreen';
import Collections from './pages/product/Collections/Collections';
import CollectionProducts from './pages/product/Collections/CollectionProducts';
const App = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/header' element={<Header/>}/>
      <Route path='/footer' element={<Footer/>}/>
      <Route path='/login' element={<LoginScreen/>}/>
      <Route path='/registeruser' element={<RegisterUserScreen/>}/>
      <Route path='/ProdCollections' element={<Collections/>}/>
      <Route path="/collection/:collectionId" element={<CollectionProducts />}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App