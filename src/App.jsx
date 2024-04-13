import React, { useEffect, useState, useRef, useCallback } from 'react'
import BanPick from '../src/BanPick/BanPick'
import ChampSelect from '../src/ChampSelect/ChampSelect'
import {FiRefreshCw} from 'react-icons/fi'
import { Link } from "react-router-dom";
import img from './assets/header.svg'
import video from './assets/background-video-d-02.mp4'
import progress from './assets/progress.svg'
import Header from './Header/Header';


const App = () => {


  const [bp, setBp] = useState([...Array(20)].fill(''))
  const [pos, setPos] = useState(-1)
  const [champ, setChamp] = useState('')

  const myTurn =  new Set([0, 2, 4, 6, 9, 10, 13, 15, 17, 18]);

  useEffect(()=>{
    if(pos>=0 && pos !== '' && champ !== ''){
    const newBp = [...bp];
    newBp[pos] = champ;
    setBp(newBp)
    setChamp('')
    setPos('')
    }
  },[bp,pos,champ]
  )

/* 
  function resetClick(){
    setBp([...Array(20)].fill(''))
    setChamp('')
    setPos('')
  }
 */


  return (
    <>  
        <Header init={99} time={99} pos={pos} myTurn={myTurn}/>

        <div className='bp__page'>

          <div className='blue'>
            <BanPick setPos={setPos} pos={pos} bp={bp} color='blue' setBp={setBp}/>
          </div>

          <div className='champ'>
            <ChampSelect setChamp={setChamp} champ={champ} pos={pos} bp={bp} />
          </div>

          <div className='red'>
            <BanPick setPos={setPos} pos={pos} bp={bp} color='red' setBp={setBp}/>
          </div>
          
        </div>
    </>
  )
}

export default App