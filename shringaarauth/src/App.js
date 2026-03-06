import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import SignUp from './Componants/UserRegister/SignUp'
import SingIn from './Componants/UserLogin/SingIn.jsx';
const App = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<SingIn/>}/>
        <Route path="/Auth-SignUp" element={<SignUp />}/>
    </Routes>
    </BrowserRouter>
    </>
  
  )
}

export default App
