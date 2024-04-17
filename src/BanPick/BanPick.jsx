import React from 'react'
import './BanPick.css'
import BanBox from '../Component/BanBox/BanBox'
import PickBox from '../Component/PickBox/PickBox'

const BanPick = (props) => {

  const {color,pos, setBp,bp, setPos, champMap} =props

    let ban1 = color ==='blue' ? ['0','2','4'] : ['1','3','5'];
    let pick1 = color ==='blue' ? ['6','9','10'] : ['7','8','11'];
    let ban2 = color ==='blue' ? ['13','15'] : ['12','14'];
    let pick2 = color ==='blue' ? ['17','18'] : ['16','19'];

  function posClick(prev,id){
    
    if(id===prev){
      setPos('')
      return
    }
    setPos(id);
  }

  function posRightClick(e,id){
    e.preventDefault();
    const newBp = [...bp];
    newBp[id] = '';
    setBp(newBp)
    setPos('')
  }

  return (
    <div className={`container ${color}`}>
      <div className='ban_container'>
        {ban1.map((s)=> <BanBox num={s} posClick={posClick} posRightClick={posRightClick} bp={bp} pos={pos} key={s}/>)}
        {ban2.map((s)=> <BanBox num={s} posClick={posClick} posRightClick={posRightClick} bp={bp} pos={pos} key={s}/>)}
      </div>

      <div className='pick_container'>
        {pick1.map((s)=> <PickBox pos={pos} num={s} posClick={posClick} posRightClick={posRightClick} bp={bp} champMap={champMap} color={color} key={s}/>)}
        {pick2.map((s)=><PickBox pos={pos} num={s} posClick={posClick} posRightClick={posRightClick} bp={bp} champMap={champMap} color={color} key={s}/>)}
      </div>
    </div>
  )
}

export default BanPick
