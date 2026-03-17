import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom";
import HomePage from './pages/home/HomePage';
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import LoginScreen from './store/auth/LoginScreen';
import RegisterUserScreen from './store/auth/RegisterUserScreen';
import Collections from './pages/product/Collections/Collections';
import CollectionProducts from './pages/product/Collections/CollectionProducts';
import Cart from './pages/cart/Cart';
import Checkout from './pages/Checkout/Checkout';
import PlaceOrder from './Payment/PlaceOrder';
import SignUp from './Auth/Register/SignUp';
import SignIn from './Auth/Login/SignIn';
import Orders from './pages/Orders/Orders';
import Shop from './components/layout/Header/Shop';
import TrackPackage from './components/layout/Header/SubHeader/TrackPackage/TrackPackage';
import ReturnExchange from './components/layout/Header/SubHeader/Return&Exchange/ReturnExchange';
import ContactUs from './components/layout/Header/SubHeader/ContactUs/ContactUs';
const App = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/SignIn' element={<SignIn/>}/>
      <Route path='/SignUp' element={<SignUp/>}/>
      <Route path='/header' element={<Header/>}/>
      <Route path='/footer' element={<Footer/>}/>
      <Route path='/login' element={<LoginScreen/>}/>
      <Route path='/registeruser' element={<RegisterUserScreen/>}/>
      <Route path='/ProdCollections' element={<Collections/>}/>
      <Route path="/collection/:collectionId" element={<CollectionProducts />}/>
      <Route path='cart' element={<Cart/>}/>
      <Route path='/checkout' element={<Checkout/>}/>
      <Route path='/PlaceOrder' element={<PlaceOrder/>}/>
      <Route path='/orders' element={<Orders/>}/>
      <Route path='/shop' element={<Shop/>}/>
      <Route path='/track-order' element={<TrackPackage/>}/>
      <Route path='/returns' element={<ReturnExchange/>}/>
      <Route path='/contact' element={<ContactUs/>}/>

      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App