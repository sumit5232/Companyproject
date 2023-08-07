import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import Dashboard from './Components/Dashboard';
import User from './Components/User';
import GetProfile from './Components/GetProfile';



function App() {
  return (
    <BrowserRouter>
    
      <Sidebar>
  
          {/* <Nav /> */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/user" element={<User />} />
          <Route path="/getprofile/:emailAddress" element={<GetProfile />} />
         
        </Routes>
      </Sidebar>
     
    
      </BrowserRouter> 
  );
}

export default App;