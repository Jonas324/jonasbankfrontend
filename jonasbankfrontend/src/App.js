import React, {useState} from "react";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Welcome from './Directory/Welcome'
import Register from './Directory/Register';
import Login from './Directory/Login';
import User from './Directory/User';
import Payment from './Directory/Payment';
import Transaction from './Directory/Transaction';
import UpdateUser from './Directory/UpdateUser';

function App() {

  return (
    
    <Router>
      <div className="App">
        <div className="content">
          <Routes>
            <Route path="/" element={<Welcome />}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/user" element={<User />}/>
            <Route path="/payment" element={<Payment />} />
            <Route path="/transaction" element={<Transaction />} />
            <Route path="/updateUser" element={<UpdateUser />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
export default App;
