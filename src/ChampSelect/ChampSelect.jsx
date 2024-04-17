import React, { useEffect, useState, memo, useMemo,useRef, useCallback } from 'react'
import "./ChampSelect.css"
import ChampBackground from '../Component/ChampBackground/ChampBackground'

const ChampSelect = (props) => {
  const {champ, setChamp, bp, oneChamp} = props

  const [searchText, setSerachText] = useState('')

  function champClick (prev,name){

    if(name===prev){
      setChamp('')
      return
    }

    setChamp(name)
  }

  return (
    <div className='champ__wrapper champ'>
          <ChampBackground/>

            <input className='search' type='text' value={searchText} placeholder='Search...' onChange={(e)=> setSerachText(e.target.value)}></input>

          <div className='champ__list'>
            {Object.values(oneChamp).map((s)=>{
              if(s.slice(0,searchText.length).toLowerCase()===searchText.toLowerCase()){

                return  (
                  <div className='champ_btn' key={s}>
                    <button disabled={bp.find(o=>o===s)} onClick={()=>champClick(champ,s)} key={s} className={champ===s?'selected':''} >
                        <img  src={`/icon/${s}.png`}  alt="" />
                    </button>
                    <h3>{s}</h3>
                  </div>)
              }
            }
            )}
          </div>
    </div>
  )
}

export default memo(ChampSelect)