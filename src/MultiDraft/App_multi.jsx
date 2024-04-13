import React, { useEffect, useState, useRef, useCallback } from 'react'
import {FiRefreshCw} from 'react-icons/fi'
import { useParams } from 'react-router-dom'
import { updateDoc, setDoc, doc, onSnapshot, Timestamp } from 'firebase/firestore';
import db from '../db/firedb'
import BanPick_multi from './BanPick_multi/BanPick_multi'
import ChampSelect_multi from './ChampSelect_multi/ChampSelect_multi'
import { Link } from "react-router-dom";
import Links from '../Links';
import Header from '../Header/Header';



const App_multi = ({side}) => {

  const {id} = useParams()

  const [oneChamp, setOneChamp] = useState([])
  const [champMap, setChampMap] = useState({})


  const getAllChamp = async () => {
    try{    
        const response = await fetch('http://ddragon.leagueoflegends.com/cdn/13.12.1/data/en_US/champion.json')
        let res = await response.json();
        let data = res.data;
        let objArray =  Object.keys(data).map(function (key) { return data[key].id; });
        setOneChamp(objArray)
        Object.keys(data).forEach( (key)=> {  champMap[key] = `${data[key].key}`; });
        setChampMap({...champMap})

    } catch (err) {
    }

  };

  useEffect( ()=>{
       getAllChamp()
    
  },[]
  )
  
  const [selected_side, setSelected_side] = useState(side);

  const [bp, setBp] = useState([...Array(20)].fill(''))
  const [pos, setPos] = useState(-1)
  const [champ, setChamp] = useState('')
  const [draft, setDraft] = useState(false)
  const [oppDraft, setOppDraftt] = useState(false)
  const [bothDraft, setBothDraft] = useState(false)
  
  const [end, setEnd] = useState(0)

  const [count, setCount] = useState(5)

  const [blue, setBlue] = useState('');
  const [red, setRed] = useState('');
  const [time, setTime] = useState(30);

  const now = Timestamp.now().toMillis();

  const BLUE_SIDE_PICKS = new Set([0, 2, 4, 6, 9, 10, 13, 15, 17, 18]);
  const RED_SIDE_PICKS = new Set([1, 3, 5, 7, 8, 11, 12, 14, 16, 19]);

  const ban = new Set([0, 1, 2, 3, 4, 5, 12, 13, 14, 15])

  const myTurn = selected_side==="blue" ? BLUE_SIDE_PICKS : RED_SIDE_PICKS

  const db_conn = doc(db,'drafting',id);

  useEffect(()=> {
    onSnapshot(db_conn,(doc)=>{
    setBp(doc.data().bp)
    setPos(doc.data().pos)
    selected_side==='blue'? setDraft(doc.data().ready_blue) : setDraft(doc.data().ready_red)
    selected_side==='blue'? setOppDraftt(doc.data().ready_red) : setOppDraftt(doc.data().ready_blue)
    setEnd(doc.data().end_time)
    setBlue(doc.data().blue_name)
    setRed(doc.data().red_name)
    setTime(doc.data().timer)
    if(doc.data().ready_blue && doc.data().ready_red) {setBothDraft(true)}else{setBothDraft(false)}

    })
  },[])


  useEffect(()=>{
    if (now>end+1000 && bothDraft===true) {
      let FilterChamp = oneChamp.filter((v)=> !bp.includes(v));

      let newBP =[...bp]
      if(bp[pos]=='' && !ban.has(pos)) {newBP[pos] = FilterChamp[Math.floor(Math.random() * FilterChamp.length)]}
      setBp(()=>newBP)
      updateDoc(db_conn,{
        start_time: Timestamp.now().toMillis(),
        end_time: Timestamp.now().toMillis()+ time*1000,
        bp:newBP,
        pos: pos+1
      })
    }
},[count])


//  console.log(bp)
//  console.log('pos: '+ pos + 'champ: ' + champ)
/*
  useEffect(()=>{
    if (draft===true && oppDraft===true){
      return setBothDraft(true)
    } 
    else{
      setBothDraft(false)
    }
  },[draft,oppDraft])
  */

  useEffect(()=>{
    let timer;
    if(bothDraft){
      setCount(time)
      timer = setInterval(()=>setCount((prev)=>prev-1),1000)
    }
    return () => {
      clearInterval(timer)}
  },[pos])


  useEffect(()=>{
    let timer ;
    if(!bothDraft) {
      clearInterval(timer)
      return 
    }
//    if (bothDraft===true){
      
      updateDoc(db_conn,{
        pos: pos===-1? pos+1 :pos,
        start_time: Timestamp.now().toMillis(),
        end_time: pos===-1 ? Timestamp.now().toMillis()+ time*1000 : end
      })
      setEnd(Timestamp.now().toMillis()+ time*1000,)
      timer = setInterval(()=>setCount((prev)=>prev+1),100)
      
//    }
//    else{
      clearInterval(timer)
//   }
    
    return () => {
      clearInterval(timer)
    }
  },[bothDraft]
  )



  useEffect(()=>{
    if(draft && champ !== ''){
      const newBp = [...bp];
      newBp[pos] = champ;
      setBp(newBp)
      setChamp('')
    } else

    if(!draft && pos !== '' && champ !== ''){
      const newBp = [...bp];
      newBp[pos] = champ;
      setBp(newBp)
      setChamp('')
      setPos('')
    }

    if(pos==20){
      setDraft(false)
      setBothDraft(false)
      updateDoc(db_conn,{ready_blue:false,ready_red:false})
      setPos(21)
    }
  },[bp,pos,champ])

  function draftClick(){
    if(draft===false){
      setDraft(true)
      selected_side==='blue'? updateDoc(db_conn,{ready_blue:true}) : updateDoc(db_conn,{ready_red:true})
      //setDraft(false)

      //updateDoc(db_conn,{ready_blue:false, ready_red:false})
    }
  }

  function confirmClick(){
    setPos((prev)=>prev+1)

    updateDoc(db_conn,{
      bp: bp,
      pos: pos+1,
      start_time: Timestamp.now().toMillis(),
      end_time: Timestamp.now().toMillis()+ time*1000,
    })

    
  }

  function resetClick(){
    setBp([...Array(20)].fill(''))
    setChamp('')
    setPos('')
    setDoc(doc(db,'drafting',id),{
      bp: [...Array(20)].fill(''),
      pos: -1,
      ready_red: false,
      ready_blue: false,
      start_time: 0,
      end_time: 0,
      red_name:red,
      blue_name:blue,
      first: 0,
      timer:time
      })

    }
/*
  function sessionChange(e){
    setSession(e.target.value)
//    setCount(e.target.value)
  }
*/
  const count_show = bothDraft===true?Math.ceil((end-now)/1000):time

  return (
    <>  

      {/*<div className='header'>
        <p className={BLUE_SIDE_PICKS.has(pos)? 'blue_header':''}>{blue}</p>
        {BLUE_SIDE_PICKS.has(pos) ? <p>{count_show<0 ? time:count_show}</p> :<p></p>}

        <Link to='/'>
          <h1>{match}</h1>
        </Link>
        
        {RED_SIDE_PICKS.has(pos) ? <p>{count_show<0 ? time:count_show}</p> :<p></p>}
        
        <p className={RED_SIDE_PICKS.has(pos)? 'red_header':''}>{red}</p>

      </div>init={time} time={count_show}*/}
        
        <Header  init={time} time={count_show} pos={pos} myTurn={myTurn} blue_name={blue} red_name={red}/>

        
        <div className='bp__page'>
          <div className='blue' >
            <BanPick_multi setPos={setPos} pos={pos} bp={bp} color='blue' setBp={setBp}/>
            </div>
            <div className='champ'>
              <div className='champ_control'>
                <ChampSelect_multi setChamp={setChamp} champ={champ} pos={pos} bp={bp} selected_side={selected_side} />
                <div className='ready_button'>
                  <button onClick={()=>resetClick()}>Reset</button>
                  {draft===false ? <button disabled={pos>20} onClick={draftClick}> Ready</button> :
                  <button disabled={!myTurn.has(pos)} onClick={confirmClick}> Select</button>}

                </div>
              </div>
            </div>
          <div className='red'>
            <BanPick_multi setPos={setPos} pos={pos} bp={bp} color='red' setBp={setBp}/>
          </div>
        </div>
    </>
  )
}
/*
      <button  onClick={draftClick}><FiRefreshCw /> Draft</button>
      <button disabled={!myTurn.has(pos)} onClick={confirmClick}><FiRefreshCw /> Confirm</button>
                <p>{count_show<0 ? 10:count_show}</p>

                <input type="text" onChange={sessionChange} value={session}></input>



 */

export default App_multi