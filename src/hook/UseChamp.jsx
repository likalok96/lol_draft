import React, { useEffect, useState } from 'react'

const UseChamp = () => {
    const [oneChamp, setOneChamp] = useState([])
    const [champMap, setChampMap] = useState({})
  
    useEffect( ()=>{
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
  
      getAllChamp()
  
    },[])

  return {
    oneChamp,
    setOneChamp,
    champMap,
    setChampMap
  }
}

export default UseChamp