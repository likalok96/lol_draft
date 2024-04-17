import React from 'react'
import Box from '../BanBox/BanBox'
import './PickBox.css'

const PickBox = ({pos,num,posClick,posRightClick,bp,champMap,color}) => {

    function icon(bp,num){
        if(bp[num]===''){
            return '/icon/none.png'
        }
        return `/icon/${bp[num]}.png`
    }

  return (
    <div className='pick'>
              
        <div className='pick_bg'
        style={{backgroundImage:`url(https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-splashes/${champMap[bp[num]]}/${champMap[bp[num]]}000.jpg)`}}>
        </div>
        {pos==num&& <div className={`box_selected_${color}`}></div>}
        {pos==num && <video src={'https://assets.contentstack.io/v3/assets/blt2ac872571a60ee02/blt7a72b1686eb3219a/618d75137ae6ce6fab413b1f/background-video-d-02.mp4'} loop muted autoPlay  
        className={`pick_video pick_video_${color}`}></video>}
        
        <button  onClick={()=>posClick(pos,num)} onContextMenu={(e)=>posRightClick(e,num)} className={pos==num ? 'selected' : ''} > <img className='bp__focus' src={icon(bp,num)}  alt="" /> </button>


    </div>
  )
}

export default PickBox