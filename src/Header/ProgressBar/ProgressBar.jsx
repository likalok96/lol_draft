import React from 'react'

const ProgressBar = ({time,init,side}) => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 377 36" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio='none' style={{width:`${time/init*100}%`}}>
        <rect x="103" y="31.5" width="274" height="2" fill="url(#paint0_linear_691_49)"/>
        <defs>
        <linearGradient id="paint0_linear_691_49" x1="103" y1="30" x2="377" y2="30" gradientUnits="userSpaceOnUse">
        <stop stop-color={side=='red' ? '#D28080' : "#80CAD2"}/>
        <stop offset="0.215" stop-color={side=='red' ? '#B72C3D' :"#2CA8B7"}/>
        <stop offset="1" stop-color={side=='red' ? '#820118' :"#015A82"}/>
        </linearGradient>
        </defs>
    </svg>
  )
}

export default ProgressBar