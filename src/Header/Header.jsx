import React from 'react';
import img from '../assets/header.svg';
import ProgressBar from './ProgressBar/ProgressBar';
import './Header.css'

const Header = ({time,init,pos, myTurn,blue_name,red_name}) => {

  const BLUE_SIDE_PICKS = new Set([0, 2, 4, 6, 9, 10, 13, 15, 17, 18]);
  const RED_SIDE_PICKS = new Set([1, 3, 5, 7, 8, 11, 12, 14, 16, 19]);

  return (
    <div className='header'>
      
      <div></div>

      <div className='header_inner left'>
          <h1 className='team_name'>{blue_name}</h1>
          {BLUE_SIDE_PICKS.has(pos)&&<ProgressBar time={time} init={init} side={'blue'}/>}
        <img src={img} alt="" width={400} height={100} preserveAspectRatio='none'></img>
      </div>

      <h1 className='instruction'>{myTurn.has(pos) ? 'Select A Champion' : 'Select A Champion'}</h1>
      
      <h1>{time>=0 ? time: init}</h1>
      
      <div className='header_inner right'> 
        <h1 className='team_name'>{red_name}</h1>
        {RED_SIDE_PICKS.has(pos)&&<ProgressBar time={time} init={init} side={'red'}/>}
        <img src={img} alt="" width={400} height={100}/>
      </div>
      
      <div></div>

    </div>
  )
}

export default Header