import React, { useState } from "react";
import { Navigate, Routes, Route } from "react-router";


import Login from "./screen/auth/Login";
import Register from "./screen/auth/Register";


// import Profile from "./screen/user/Profile"


function App() {
  const [user, setUser] = useState(null);

  return (
    <>
    <Navigate/>
   
     <div style={{marginTop:"90px"     }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />  
          
          

       
        </Routes>
        </div>
    </>
   
  );
}

export default App;
