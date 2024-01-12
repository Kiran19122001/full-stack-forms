// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login/Login.js";
import Registration from "./components/Registration/Register.js";
import Table from "./components/Table/table.js";

import Auth from "./Auth.js"
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Registration />} />
           <Route path="/" element={<Auth><Table/></Auth>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
