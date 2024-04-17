import React from 'react'
import './BanBox.css'

const BanBox = ({pos,num,posClick,posRightClick,bp}) => {
    
    function icon(bp,num){
        if(bp[num]===''){
            return '/icon/none.png'
        }
        return `/icon/${bp[num]}.png`
    }

    return (
    <button onClick={()=>posClick(pos,num)} onContextMenu={(e)=>posRightClick(e,num)} className={pos==num ? 'selected ban' : 'ban'} key={num}> <img className='bp__focus' src={icon(bp,num)}  alt="" /> </button>
  )
}

export default BanBox