 const riotapi =
  "http://ddragon.leagueoflegends.com/cdn/13.12.1/data/en_US";


 const getAllChamp = async () => {
    try{    
        const response = await fetch('http://ddragon.leagueoflegends.com/cdn/13.12.1/data/en_US/champion.json')
        console.log('response:' + response);
        let res = await response.json();
        let data = res.data;
        console.log('res:'+res);
        
        return data;
    } catch (err) {
        console.log(err)
    }

  };

   const getOneChamp = async () => {
     let obj = await getAllChamp();
     let objArray = Object.keys(obj).map(function (key) { return obj[key]; });
     return objArray[0];
    
  }

/*
  getAllChamp().then(res=>{
    let allChampList = res
    a = allChampList.type
    console.log(a)

})
*/

