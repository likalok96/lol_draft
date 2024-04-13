import React from 'react'
import { Routes, Route, Outlet, Link } from "react-router-dom";
import "./Menu.css"

const Menu = () => {
  return (
    <div className='main__container'>
      <div className='second__container'>
                
                  <Link to='App' style={{textDecoration:'none'}}>
                    <h1>Solo Draft</h1>
                    <h5>Single Player</h5>
                    <h2>Drafting without time limit and order.
                    Play around with a tournament draft pro teams use
							with / without time limits and invite spectators to
							watch your drafts.
                    </h2>
                    </Link>
                    </div>
                
                  
                    <div className='second__container'>

                  <Link to='Links' >
                    <h1>VS mode Draft</h1>
                    <h5>Two Player</h5>
                    <h2>Drafting vs opponent with time limit.
                    Participate in a mock draft with another
							coach with a generated link with custom settings.
							Spectator links will also be available.
                    </h2>
                    </Link>
                </div>
        

    </div>
  )
}

export default Menu