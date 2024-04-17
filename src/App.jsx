import React, { useEffect, useState } from 'react'
import BanPick from '../src/BanPick/BanPick'
import ChampSelect from '../src/ChampSelect/ChampSelect'
import Header from './Header/Header';
import './App.css'
import UseChamp from './hook/UseChamp';

const App = () => {

  const {oneChamp, champMap} = UseChamp();

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

  return (
    <>  
        <Header init={99} time={99} pos={pos} myTurn={myTurn}/>

        <div className='bp__page'>

            <BanPick setPos={setPos} pos={pos} bp={bp} color='blue' setBp={setBp} champMap={champMap}/>

            <ChampSelect setChamp={setChamp} champ={champ} pos={pos} bp={bp} oneChamp={oneChamp} />

            <BanPick setPos={setPos} pos={pos} bp={bp} color='red' setBp={setBp} champMap={champMap}/>
          
        </div>
    </>
  )
}

export default App