import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/home/HomePage';
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import LoginScreen from './store/auth/LoginScreen';
import RegisterUserScreen from './store/auth/RegisterUserScreen';
import ProdCollections from './pages/product/Collections/ProdCollections';
import BestSeller from './pages/Collections/BestSeller';
import BridalCollection from './pages/Collections/BridalCollection';
import DemiFineJewellery from './pages/Collections/DemiFineJewellery';
import Earrings from './pages/Collections/Earrings';
import LuxuryCollection from './pages/Collections/LuxuryCollection';
import VoguishJewellery from './pages/Collections/VoguishJewellery';
import Westernjewellery from './pages/Collections/Westernjewellery';
import WhatsNew from './pages/Collections/WhatsNew';
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/header' element={<Header />} />
          <Route path='/footer' element={<Footer />} />
          <Route path='/login' element={<LoginScreen />} />
          <Route path='/registeruser' element={<RegisterUserScreen />} />
          <Route path='/prodCollections' element={<ProdCollections />} />
          <Route path='/bestSeller' element={<BestSeller />} />
          <Route path='/bridalCollection' element={<BridalCollection/>}/>
          <Route path='/demiFineJewellery' element={<DemiFineJewellery/>}/>
          <Route path='/earrings' element={<Earrings/>}/>
          <Route path='/luxuryCollection' element={<LuxuryCollection/>}/>
          <Route path='/voguishJewellery' element={<VoguishJewellery/>}/>
          <Route path='/westernjewellery' element={<Westernjewellery/>}/>
          <Route path='/whatsNew' element={<WhatsNew/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App