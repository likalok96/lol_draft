import React from 'react'
import { Routes, Route, Router, BrowserRouter } from 'react-router-dom';
import App from './App';
import Menu from './Menu/Menu';
import UsePeer from './hook/UsePeer';
import Links from './Links';
import App_multi from './MultiDraft/App_multi';
import { Link } from "react-router-dom";


const Route_try = () => {
  return (
    <BrowserRouter  basename={process.env.PUBLIC_URL}>
      <Link to='/'>
        <img src={'/favicon.ico'} style={{position:'absolute',top:'3%', left:'3%',border:'0',zIndex:'99'}}/>
      </Link>
        <Routes>
            <Route path='/' element={<Menu />} />
            <Route path='App' element={<App />} />
            <Route path='UsePeer' element={<UsePeer />} />
            
            <Route path='Links' element={<Links />} />
            <Route path='Red/:id' element={<App_multi side='red' />} />
            <Route path='Blue/:id' element={<App_multi side='blue' />} />
            <Route path='Host/:id' element={<App_multi side='host' />} />
            

        </Routes>
    </BrowserRouter >
  )
}
//Red/:id

export default Route_try