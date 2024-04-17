import React, { useEffect, useState, memo, useMemo,useRef, useCallback } from 'react'
import ChampBackground from '../../Component/ChampBackground/ChampBackground';
import '../../ChampSelect/ChampSelect.css'

const ChampSelect = (props) => {
  const {champ, setChamp, bp ,pos, selected_side,oneChamp} = props

  const [searchText, setSerachText] = useState('')

  const BLUE_SIDE_PICKS = new Set([0, 2, 4, 6, 9, 10, 13, 15, 17, 18]);
  const RED_SIDE_PICKS = new Set([1, 3, 5, 7, 8, 11, 12, 14, 16, 19]);

  const myTurn = selected_side==="blue" ? BLUE_SIDE_PICKS : RED_SIDE_PICKS

  function champClick (prev,name){

    if(name===prev){
      setChamp('')
      return
    }

    setChamp(name)
  }

  return (
    <div className='champ__wrapper'>
        <ChampBackground/>
        
            <input className='search' type='text' value={searchText} placeholder='Search' onChange={(e)=> setSerachText(e.target.value)}></input>

          <div className='champ__list'>
        
        {Object.values(oneChamp).map((s)=>{
          if(s.slice(0,searchText.length).toLowerCase()===searchText.toLowerCase()){

            return  (
            <div className='champ_btn' key={s}>
              {myTurn.has(pos) ? <button  disabled={bp.find(o=>o===s)} onClick={()=>champClick(champ,s)} key={s} > <img  src={`/icon/${s}.png`}  alt="" /> </button>:
              <button  disabled={bp.find(o=>o===s)}  key={s} > <img  src={`/icon/${s}.png`}  alt="" /> </button>}
            
              <h3>{s}</h3>
            </div>
            )

          }
        }
        )}
          </div>
    </div>
  )
}


export default memo(ChampSelect)