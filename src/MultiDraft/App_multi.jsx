import React, { useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { updateDoc, setDoc, doc, onSnapshot, Timestamp } from 'firebase/firestore';
import db from '../db/firedb'
import BanPick_multi from './BanPick_multi/BanPick_multi'
import ChampSelect_multi from './ChampSelect_multi/ChampSelect_multi'
import Header from '../Header/Header';
import './App_multi.css';
import UseChamp from '../hook/UseChamp';

const App_multi = ({side}) => {

  const {id} = useParams()
  const {oneChamp, champMap} = UseChamp();

  const selected_side = side;

  const [bp, setBp] = useState([...Array(20)].fill(''))
  const [pos, setPos] = useState(-1)
  const [champ, setChamp] = useState('')
  const [draft, setDraft] = useState(false)
  const [bothDraft, setBothDraft] = useState(false)
  
  const [end, setEnd] = useState(0)

  const [count, setCount] = useState(5)

  const [blue, setBlue] = useState('');
  const [red, setRed] = useState('');
  const [time, setTime] = useState(30);

  const now = Timestamp.now().toMillis();

  const count_show = bothDraft===true?Math.ceil((end-now)/1000):time

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
      
      updateDoc(db_conn,{
        pos: pos===-1? pos+1 :pos,
        start_time: Timestamp.now().toMillis(),
        end_time: pos===-1 ? Timestamp.now().toMillis()+ time*1000 : end
      })
      setEnd(Timestamp.now().toMillis()+ time*1000,)
      timer = setInterval(()=>setCount((prev)=>prev+1),100)

      clearInterval(timer)
    
    return () => {
      clearInterval(timer)
    }
  },[bothDraft]
  )

  useEffect(()=>{
    if(bothDraft && champ !== ''){
      const newBp = [...bp];
      newBp[pos] = champ;
      setBp(newBp)
      setChamp('')
    } else

    if(!bothDraft && pos !== '' && champ !== ''){
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

  return (
    <>  
        <Header  init={time} time={count_show} pos={pos} myTurn={myTurn} blue_name={blue} red_name={red}/>

        <div className='bp__page'>

            <BanPick_multi pos={pos} bp={bp} color='blue' champMap={champMap}/>

            <div className='champ_control'>
              <ChampSelect_multi setChamp={setChamp} champ={champ} pos={pos} bp={bp} selected_side={selected_side} oneChamp={oneChamp}/>

              <div className='ready_button'>
                <button onClick={()=>resetClick()}>Reset</button>
                {draft===false ? <button disabled={pos>20} onClick={draftClick}> Ready</button> :
                <button disabled={!myTurn.has(pos) || !bp[pos]} onClick={confirmClick}> Select</button>}
              </div>

            </div>

            <BanPick_multi pos={pos} bp={bp} color='red' champMap={champMap}/>

        </div>
    </>
  )
}

export default App_multi