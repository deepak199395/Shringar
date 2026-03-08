import React, { useState } from 'react';
import axios from "axios";
import "./SignUp.css"
const SignUp = () => {
const [FullName,setFullName]=useState("")
const [phoneNumber,setphoneNumber]=useState("")
const [Email,setEmail]=useState("")
const [Password,setPassword]=useState("")
const [Dob,setDob]=useState("")
const [age,setage]=useState("")
const [Address,setAddress]=useState("")
const [City,setCity]=useState("")
const [Gender,setGender]=useState("")
const [Pincode,setPincode]=useState("")
const [Country,setCountry]=useState("")
const [State,setState]=useState("")

const handleLogin=async(e)=>{
  e.preventDefault();
  try {
    const response = await axios.post("https://api.shrigaar.com/api/v1/shringar/User/registerUser/api55",
      {
        FullName,phoneNumber,Email,Password,Dob,age,Address,City,Gender,Pincode,Country,State
      }
    );
      console.log("Success:", response.data);
      alert("User Registered Successfully");

  } catch (error) {
    console.log("Error:", error);
    alert("Registration Failed");
  }
}

  return (
   <>
    <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>FullName</label>
            <input
              type="text"
              placeholder="Enter your email"
              value={FullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>phoneNumber</label>
            <input
              type="number"
              placeholder="Enter your email"
              value={phoneNumber}
              onChange={(e) => setphoneNumber(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your email"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Dob</label>
            <input
              type="text"
              placeholder="Enter your email"
              value={Dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>age</label>
            <input
              type="number"
              placeholder="Enter your email"
              value={age}
              onChange={(e) => setage(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Address</label>
            <input
              type="text"
              placeholder="Enter your email"
              value={Address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>City</label>
            <input
              type="text"
              placeholder="Enter your email"
              value={City}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Country</label>
            <input
              type="text"
              placeholder="Enter your email"
              value={Country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>State</label>
            <input
              type="text"
              placeholder="Enter your email"
              value={State}
              onChange={(e) => setState(e.target.value)}
            />
          </div>
           <div className="input-group">
            <label>Pincode</label>
            <input
              type="text"
              placeholder="Enter your email"
              value={Pincode}
              onChange={(e) => setPincode(e.target.value)}
            />
          </div>
           <div className="input-group">
            <label>Gender</label>
            <input
              type="text"
              placeholder="Enter your email"
              value={Gender}
              onChange={(e) => setGender(e.target.value)}
            />
          </div>
          <button type="submit" className="login-btn">
            Sign Up
          </button>
        </form>

   </>
  )
}

export default SignUp
