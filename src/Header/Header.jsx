import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import img from '../assets/header.svg';
import ProgressBar from './ProgressBar/ProgressBar';

const Header = ({time,init,pos, myTurn,blue_name,red_name}) => {
/*
  const [count, setCount] = useState(5)
  const [time, setTime] = useState(30);

  const db_conn = doc(db,'drafting',id);

  useEffect(()=>{
    if (now>=end && bothDraft===true) {
    updateDoc(db_conn,{
    start_time: Timestamp.now().toMillis(),
    end_time: Timestamp.now().toMillis()+ time*1000,
    pos: pos+1
    }) 
  
  }
  },[count])

  useEffect(()=>{
    let timer ;
    if (bothDraft===true){
      
        console.log('both draft')
      updateDoc(db_conn,{
        pos: pos===-1? pos+1 :pos,
        start_time: Timestamp.now().toMillis(),
        end_time: pos===-1 ? Timestamp.now().toMillis()+ time*1000 : end
      })

      
      setEnd(Timestamp.now().toMillis()+ time*1000,)
      timer = setInterval(()=>setCount((prev)=>prev+1),1000)
    }
    else{
      clearInterval(timer)
    }
    
    return () => {
      clearInterval(timer)
  }

  


  },[bothDraft]
  )

  const count_show = bothDraft===true?Math.ceil((end-now)/1000):time
*/
//    const init = 20;
  const BLUE_SIDE_PICKS = new Set([0, 2, 4, 6, 9, 10, 13, 15, 17, 18]);
  const RED_SIDE_PICKS = new Set([1, 3, 5, 7, 8, 11, 12, 14, 16, 19]);
/*
    const [count, setCount] = useState(time)

    useEffect(()=>{
      
        const timer = setInterval(()=>{
          if(count) setCount((prev)=>prev-0)
        },1000)
      
        return ()=>{
          clearInterval(timer)
        }
    
      },[])
*/
/*
  const Bp_svg = ()=>{
    return (
      <svg width="100%" height="100%" viewBox="0 0 377 36" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio='none' style={{width:`${time/init*100}%`}}>
          <rect x="103" y="31.5" width="274" height="2" fill="url(#paint0_linear_691_49)"/>
          <defs>
          <linearGradient id="paint0_linear_691_49" x1="103" y1="30" x2="377" y2="30" gradientUnits="userSpaceOnUse">
          <stop stop-color="#D28080"/>
          <stop offset="0.215" stop-color="#B72C3D"/>
          <stop offset="1" stop-color="#820118"/>
          </linearGradient>
          </defs>
        </svg>
    )
  }
*/
  return (
    <div className='header'>
    <div></div>
    <div className='header_left'>
        <h1 style={{position:'absolute',top: '15%'}}>{blue_name}</h1>
        {BLUE_SIDE_PICKS.has(pos)&&<ProgressBar time={time} init={init} side={'blue'}/>}
       <img src={img} alt="" width={400} height={100} preserveAspectRatio='none'></img>
    </div>
    <h1 style={{position:'absolute',top:'0'}}>{myTurn.has(pos) ? 'Select A Champion' : ''}</h1>
    
      <h1>{time>=0 ? time: init}</h1>
    
    <div className='header_right'> 
      <h1 style={{position:'absolute',top: '15%'}}>{red_name}</h1>
      {RED_SIDE_PICKS.has(pos)&&<ProgressBar time={time} init={init} side={'red'}/>}
      <img src={img} alt="" width={400} height={100}/>
    </div>

    
    {/*<button className='header_btn' onClick={resetClick}><FiRefreshCw /> Reset</button>*/}
    
    <div></div>

  </div>
  )
}

export default Header