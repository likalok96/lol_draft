import React from 'react'
import './ChampBackground.css'

const ChampBackground = () => {
  return (
    <div className='champ_background'>
        <svg width="962" height="962" viewBox="0 0 962 962" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="481" cy="481" r="435.5" stroke="#565951" strokeWidth="21" strokeDasharray="2 9"/>
        <circle cx="484" cy="481" r="462" stroke="url(#paint0_linear_1669_162202)" strokeWidth="8"/>
        <circle cx="481" cy="481" r="480" stroke="url(#paint1_linear_1669_162202)" strokeWidth="2"/>
        <defs>
            <linearGradient id="paint0_linear_1669_162202" x1="484" y1="15" x2="484" y2="947" gradientUnits="userSpaceOnUse">
            <stop stopColor="#473815" stopOpacity="0.58"/>
            <stop stopColor="#473815" stopOpacity="0.58"/>
            <stop offset="0.497894" stopColor="#D6C38A"/>
            <stop offset="1" stopColor="#473815" stopOpacity="0.58"/>
            </linearGradient>
            <linearGradient id="paint1_linear_1669_162202" x1="481" y1="0" x2="481" y2="962" gradientUnits="userSpaceOnUse">
            <stop stopColor="#473815" stopOpacity="0.58"/>
            <stop stopColor="#473815" stopOpacity="0.58"/>
            <stop offset="0.497894" stopColor="#D6C38A"/>
            <stop offset="1" stopColor="#473815" stopOpacity="0.58"/>
            </linearGradient>
        </defs>
        </svg>
    </div>
  )
}

export default ChampBackground