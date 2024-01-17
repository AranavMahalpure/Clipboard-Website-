import React from 'react';
import Message from  "./components/Message";
import Login from './components/Login,js';
import SignUp from './components/Signup';
import {
  BrowserRouter as Router,
  Routes,
  Route,
 
} from "react-router-dom";
const App = () => {
  
  return (
    <div><Message/>
       {/* <Router>
        <Routes>
      <Route path= "/Login" element={<Login/>}/> 
      <Route path= "/Message" element={<Message/>}/> 
      </Routes>
     </Router> */}
    </div>
  );
};

export default App;
