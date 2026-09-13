import { BrowserRouter, Routes, Route } from "react-router-dom";

import React from 'react'
import Home from "./pages/Home";
import Register from "./pages/Register";
import Notes from "./pages/Notes";
import Login from "./pages/Login";

export default function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element= {<Home />}/>
      <Route path="/register" element= {<Register />}/>
      <Route path="/notes" element= {<Notes />}/>
      <Route path="/login" element= {<Login />}/>
    </Routes>
  </BrowserRouter>
  )
}
