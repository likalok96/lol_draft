import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from "react-router-dom";
import db from './db/firedb';
import { updateDoc, setDoc, doc, onSnapshot } from 'firebase/firestore';
import './Links.css'
import {AiFillCopy} from 'react-icons/ai'
import {BiLinkExternal} from 'react-icons/bi'



const Links = () => {

  const [blue, setBlue] = useState('Blue');
  const [red, setRed] = useState('Red');
  const [match, setMatch] = useState('Match');
  const [time, setTime] = useState(30);

  //    const randomId = generate(6)
  const randomId = 'testing'

  const redLink = `${window.origin}/Red/${randomId}`
  const blueLink = `${window.origin}/Blue/${randomId}`
  const hostLink = `${window.origin}/Host/${randomId}`

    function generate(length = 10) {
      return (Math.random() + 1).toString(36).substring(2, length + 2);
    }



    useEffect(()=> {
      setDoc(doc(db,'drafting',randomId),{
        bp: [...Array(20)].fill(''),
        pos: -1,
        ready_red: false,
        ready_blue: false,
        start_time: 0,
        end_time: 0,
        first: 0,
        match_name: 'Match',
        blue_name: 'Blue',
        red_name: 'Red',
        timer: 30
        }
      
    )},[])

    useEffect(()=> {onSnapshot(doc(db,'drafting',randomId),(doc)=>{
      console.log(doc.data())

    }
    )}
    ,[])

    const onChangeValue = useCallback( (setValue,e)=>setValue(e) )

    function FormSubmit (){
      updateDoc(doc(db,'drafting',randomId),{
        match_name: match,
        blue_name: blue,
        red_name: red,
        timer:time
      }
      )
    }

  return (
  <div className='link_main_wrapper'>
    
      <div className='form_wrapper'>
          <form  action=""  onSubmit={
            (e)=>{e.preventDefault();
                  FormSubmit()}
          }>
            <h1>Setting</h1>

            <p>Match Name</p>
            <input type="text" name='match' onChange={(e)=>onChangeValue(setMatch,e.target.value)}/>

            <p>Blue Team</p>
            <input type="text" name='blue'onChange={(e)=>onChangeValue(setBlue,e.target.value)}/>

            <p>Red Team</p>
            <input type="text" name='red' onChange={(e)=>onChangeValue(setRed,e.target.value)}/>

            <p>Timer Setting</p>
            <input type="text" name='time' onChange={(e)=>onChangeValue(setTime,e.target.value)}/>

            <button type='submit'>Finalize</button>
          </form>
        </div>

        <div className='links_second_wrapper'>
          <div className='links'>

            <h1>Links</h1>

            <h3>Blue Team</h3>
            <div className='url'>
              <p>{blueLink}</p> 
              <button onClick={()=>navigator.clipboard.writeText(blueLink)}><AiFillCopy /></button>  
              <a target='_blank' href={blueLink} ><BiLinkExternal /></a>
            </div>

            <h3>Red Team</h3>
            <div className='url'>
              <p>{redLink}</p>
              <button onClick={()=>navigator.clipboard.writeText(redLink)}><AiFillCopy /></button>  
              <a target='_blank' href={redLink}><BiLinkExternal /></a>
            </div>

          </div>
        </div>

   </div>

  )

      


  
}
//                <Link to={redLink}>Blue</Link>
//<Link to={blueLink}>Red</Link>
//        <p>123{peer.peerID}</p>
//                <a href={blueLink}>Blue</a>
//<a href={redLink}>Red</a>


export default Links