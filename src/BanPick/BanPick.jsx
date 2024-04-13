import React, { useEffect, useState } from 'react'
import './BanPick.css'
import UsePeer from '../hook/UsePeer'


const BanPick = (props) => {

  const {color,pos, setBp,bp, setPos} =props

  const [champMap, setChampMap] = useState({})
//  const champMap = {};

  const getAllChamp = async () => {
    try{    
        const response = await fetch('http://ddragon.leagueoflegends.com/cdn/13.12.1/data/en_US/champion.json')
        console.log('response:' + response);
        let res = await response.json();
        let data = res.data;
        console.log(data);
        Object.keys(data).forEach( (key)=> {  champMap[key] = `${data[key].key}`; });
        //objArray.map((key) => {return objArray[key].id} )
        setChampMap({...champMap})
        console.log('champMap')
        console.log(champMap);    
    } catch (err) {
        console.log(err)
    }

  };

  useEffect(()=>{
    getAllChamp()

  },[])

  console.log(champMap['Aatrox'])


  const BLUE_SIDE_PICKS = new Set([0, 2, 4, 6, 9, 10, 13, 15, 17, 18]);
  const RED_SIDE_PICKS = new Set([1, 3, 5, 7, 8, 11, 12, 14, 16, 19]);
  

    let ban1 = color ==='blue' ? ['0','2','4'] : ['1','3','5'];
    let pick1 = color ==='blue' ? ['6','9','10'] : ['7','8','11'];
    let ban2 = color ==='blue' ? ['13','15'] : ['12','14'];
    let pick2 = color ==='blue' ? ['17','18'] : ['16','19'];


  function posClick(prev,id){
    
    if(id===prev){
      setPos('')
      console.log('pos equal: '+pos)
      return
    }
    setPos(id);
    console.log(id);
  }

  function posRightClick(e,id){
    e.preventDefault();
    const newBp = [...bp];
    newBp[id] = '';
    setBp(newBp)
    setPos('')
  }

  function icon(bp,num){
    if(bp[num]===''){
      return '/icon/none.png'
    }
    return `/icon/${bp[num]}.png`
  }
  //`url(/${bp[num]}.png)`
  //"url('https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/" + bp[num] + "_0.jpg')"
  //style={{ backgroundImage: icon(bp,num), backgroundSize: "cover",height:'100%' }}
  function Box({pos,num,posClick,posRightClick,bp}){
    return pos==num ? <button  onClick={()=>posClick(pos,num)} onContextMenu={(e)=>posRightClick(e,num)} className='selected' > <img className='bp__focus' src={icon(bp,num)}  alt="" /> </button>
    :<button  onClick={()=>posClick(pos,num)} onContextMenu={(e)=>posRightClick(e,num)}  > <img  src={icon(bp,num)}  alt="" /> </button>
  }
  //onClick={()=>posClick(pos,num)} onContextMenu={(e)=>posRightClick(e,num)}
//id={num}
//style={{ backgroundImage: "url('https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/" + bp[0] + "_0.jpg')", backgroundSize: "cover" }}
//<img src="https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/Aatrox_0.jpg" alt="" />
//<button onClick={()=>posClick(pos,'0')} id='0' style={{ backgroundImage: icon(bp,0), backgroundSize: "cover" }}></button>
//        <Box num='1' posClick={posClick} bp={bp} pos={pos}/>
//<p>ban</p>
  return (
    <div className='container' id='con'>
      <div className='ban_container'>
        <div className='ban b1' id='b1'>
          {ban1.map((s)=> <Box num={s} posClick={posClick} posRightClick={posRightClick} bp={bp} pos={pos} key={s}/>)}
          

          {ban2.map((s)=> <Box num={s} posClick={posClick} posRightClick={posRightClick} bp={bp} pos={pos} key={s}/>)}
        </div>
      </div>

      <div className='pick p1' id='p1'>
        {pick1.map(
          (s)=>
            <div className={pos==s?'box_container ' : 'box_container'}>
              
              <div style={{backgroundImage:`url(https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-splashes/${champMap[bp[s]]}/${champMap[bp[s]]}000.jpg)`,
            backgroundPosition:'center 20%',backgroundSize:'100% 200%',backgroundRepeat:'no-repeat',width:'100%',height:'100%',position:'absolute',opacity:0.6}}></div>
              {pos==s&&<div className={color=='blue' ? 'box_selected_blue' : 'box_selected_red'}></div>}
              <Box num={s} posClick={posClick} posRightClick={posRightClick} bp={bp} pos={pos} key={s}/>
              {pos==s && <video src={'https://assets.contentstack.io/v3/assets/blt2ac872571a60ee02/blt7a72b1686eb3219a/618d75137ae6ce6fab413b1f/background-video-d-02.mp4'} loop muted autoPlay  
              style={{objectFit: 'cover', offsetPosition: 'center center', height: '100%', width: '150%', transformOrigin: 'center center', position:'absolute',zIndex:0,transform:color=='blue'?'translateX(4%) rotateY(180deg)':'translateX(-4%) rotateY(0deg)'}}></video>}
              
            </div>
        )}
      </div>
      



      <div className='pick p2' id='p2'>
        
        {pick2.map((s)=>
            <div className={pos==s?'box_container ' : 'box_container'} >
              <div style={{backgroundImage:`url(https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-splashes/${champMap[bp[s]]}/${champMap[bp[s]]}000.jpg)`,
              backgroundPosition:'center 20%',backgroundSize:'100% 200%',backgroundRepeat:'no-repeat',width:'100%',height:'100%',position:'absolute',opacity:0.6}}></div>
            {pos==s&&<div className={color=='blue' ? 'box_selected_blue' : 'box_selected_red'}></div>}
            <Box num={s} posClick={posClick} posRightClick={posRightClick} bp={bp} pos={pos} key={s}/>
            {pos==s && <video src={'https://assets.contentstack.io/v3/assets/blt2ac872571a60ee02/blt7a72b1686eb3219a/618d75137ae6ce6fab413b1f/background-video-d-02.mp4'} loop muted autoPlay  
            style={{objectFit: 'cover', offsetPosition: 'center center', height: '100%', width: '150%', transformOrigin: 'center center', position:'absolute',zIndex:0,transform:color=='blue'?'translateX(4%) rotateY(180deg)':'translateX(-4%) rotateY(0deg)'}}></video>}
            
          </div>
        
        )}
      </div>

    </div>
  )
}

export default BanPick

//ban{bp[0]}