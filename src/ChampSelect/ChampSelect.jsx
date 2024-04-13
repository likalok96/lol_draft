import React, { useEffect, useState, memo, useMemo,useRef, useCallback } from 'react'
import "./ChampSelect.css"




const ChampSelect = (props) => {
  const {champ, setChamp, bp} = props

  const [oneChamp, setOneChamp] = useState([])
  const [searchText, setSerachText] = useState('')


  

  const getAllChamp = async () => {
    try{    
        const response = await fetch('http://ddragon.leagueoflegends.com/cdn/13.12.1/data/en_US/champion.json')
        console.log('response:' + response);
        let res = await response.json();
        let data = res.data;
        console.log(data);
        let objArray =  Object.keys(data).map(function (key) { return data[key].id; });
        //objArray.map((key) => {return objArray[key].id} )
        setOneChamp(objArray)
        console.log(objArray)    
        console.log(oneChamp)
    } catch (err) {
        console.log(err)
    }

  };
  


  useEffect( ()=>{
       getAllChamp()
       console.log('effect')
    
  },[]
  )

  function champClick (prev,name){

    if(name===prev){
      setChamp('')
      console.log('pos equal: '+name)
      return
    }

    setChamp(name)
    console.log(name)
  }
  //"url('https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/" + bp[num] + "_0.jpg')"
//  style={{ backgroundImage: icon(bp,num), backgroundSize: "cover" }}
//style={{ backgroundImage: `url('../assets/icons/' + ${s} + '.png')`
//,backgroundRepeat:"no-repeat"
//, backgroundSize: "contain"}}

//style={{ backgroundImage: `url(/${s}.png)` 
//,backgroundRepeat:"no-repeat"
//, backgroundSize: "auto, auto"}}

//  const champSelect = memo(function champSelect({searchText})) {




  function FilterChamp({oneChamp, searchText, champClick, bp}){
    return <div className='champ__list' >
      
      {Object.values(oneChamp).map((s)=>{
        if(s.slice(0,searchText.length).toLowerCase()===searchText.toLowerCase()){

          return  <button disabled={bp.find(o=>o===s)} onClick={()=>champClick(champ,s)} key={s} > <img  src={`/${s}.png`}  alt="" /> </button>

        }else{
          return
        }

      }
      )}
        </div>
        
      
  //  <button onClick={()=>champClick(champ,s)} key={s} > <img src={`/${s}.png`}  alt="" /> </button> 
    
  }
/*
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr  ;
    @media screen and (max-width: 1600px) {
        grid-template-columns: repeat(5, 1fr) ;
    }

    @media screen and (max-width: 1400px) {
        grid-template-columns: repeat(3, 1fr) ;

    }
*/


  return (
    <div className='champ__wrapper'>
          <div className='champ_background'>
            <svg width="962" height="962" viewBox="0 0 962 962" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="481" cy="481" r="435.5" stroke="#565951" stroke-width="21" stroke-dasharray="2 9"/>
              <circle cx="484" cy="481" r="462" stroke="url(#paint0_linear_1669_162202)" stroke-width="8"/>
              <circle cx="481" cy="481" r="480" stroke="url(#paint1_linear_1669_162202)" stroke-width="2"/>
              <defs>
                <linearGradient id="paint0_linear_1669_162202" x1="484" y1="15" x2="484" y2="947" gradientUnits="userSpaceOnUse">
                <stop stop-color="#473815" stop-opacity="0.58"/>
                <stop stop-color="#473815" stop-opacity="0.58"/>
                <stop offset="0.497894" stop-color="#D6C38A"/>
                <stop offset="1" stop-color="#473815" stop-opacity="0.58"/>
                </linearGradient>
                <linearGradient id="paint1_linear_1669_162202" x1="481" y1="0" x2="481" y2="962" gradientUnits="userSpaceOnUse">
                <stop stop-color="#473815" stop-opacity="0.58"/>
                <stop stop-color="#473815" stop-opacity="0.58"/>
                <stop offset="0.497894" stop-color="#D6C38A"/>
                <stop offset="1" stop-color="#473815" stop-opacity="0.58"/>
                </linearGradient>
              </defs>
            </svg>

          </div>
        <div className='search__wrapper'>
            <input type='text' value={searchText} placeholder='Search...' onChange={(e)=> setSerachText(e.target.value)}></input>
        </div>

        <div className='result'>
          <div className='champ__list'>
        
        {Object.values(oneChamp).map((s)=>{
          if(s.slice(0,searchText.length).toLowerCase()===searchText.toLowerCase()){

            return  (
              <div className='champ_btn'>
              <button disabled={bp.find(o=>o===s)} onClick={()=>champClick(champ,s)} key={s} className={champ===s?'selected':''} >
                  <img  src={`/icon/${s}.png`}  alt="" />
              </button>
              <h3>{s}</h3>
              </div>
              )
               
          }else{
            return
          }

        }
        )}
          </div>
        </div>
    </div>
  )
}
//<FilterChamp oneChamp={oneChamp} searchText={searchText} champClick={champClick} bp={bp}/>
//        {{Object.values(oneChamp)}.map((s)=> <p onClick={()=>champClick({s})} id={s}>{s}</p>)}
/*
        <div className='champ__list'>
        {Object.values(oneChamp).map((s)=>   <button onClick={()=>champClick(champ,s)} key={s} > 
          <img src={`/${s}.png`}  alt="" />
        </button> 
        )}

        </div>
*/

export default memo(ChampSelect)