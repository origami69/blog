import React from 'react';
import {Route, Routes} from 'react-router-dom'
import {Login} from './pages/Login';
import {Logged} from './pages/Logged'
import {Blog} from './pages/LogPages/Blog'
function App() {
  return (
    <Routes>
      <Route path='/' element={<Logged/>} exact />
        <Route path='/Login' element={<Login/>} />
      <Route path="/Blog/:name" element={<Blog/>}/>
    </Routes>
   
  );
}

export default App;
