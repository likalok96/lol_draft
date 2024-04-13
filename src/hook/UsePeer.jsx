import React, { useEffect,useState } from 'react'
import Peer from 'peerjs';

const UsePeer = (id) => {

    const rmid= id;

    console.log(rmid)

    const [peer, setPeer] = useState(() => new Peer(rmid));
    const [peerID, setPeerID] = useState('');
    const [connection, setConnection] = useState(null);
    const [connectionId, setConnectionId] = useState('null');
    const [message , setMessage] = useState(null);

    console.log('current id: '+ peerID)
    console.log('current pid: '+ peer.id)



    useEffect(() => {
        if (!peer || (peer?.destroyed ?? true)) return setPeer(new Peer());
        peer.on('open', setPeerID);
        console.log('id: '+ peerID)
        return () => {
            peer.destroy();
            setPeerID('');
            console.log('destryoed id: '+ peerID)
        }
    }, [peer]);


    useEffect(() => {
        if (!connection) return;
        connection.on('open', () => {
            console.log('connected');
            connection.on('data', (data)=>{
                //'hahahaha'+
                console.log(data)
                setMessage(data)
            });
            connection.on('close', console.error);
            connection.on('error', console.error);
        });
    }, [connection]);


    useEffect(()=>

    peer.on('connection', (con)=>{
        console.log("Connected to: " + con.peer);
        con.send('ready')
        console.log('send ready');
        con.on('data',(data)=>{
            console.log('WTF'+data)
            
        })
        setConnection(con)
    }),[peer]

    )

    function sendMsg(msg){
            console.log('hello send')
            connection.send(msg)


    }



    function join(){

        setConnection(
            peer.connect(connectionId, { reliable: true})
            )     
            //connectionId
//            console.log("Connected to: " + connection.peer);
/*
        connection.on('open', function() {
            // Receive messages
            connection.on('data', function(data) {
              console.log('Received', data);
            });
        
            // Send messages
            connection.send('Hello!');
          }

        )
*/  
    }
    
    


  return  {
    peer,
    peerID,
    setPeer,
    setPeerID,
    connection,
    connectionId,
    setConnection,
    setConnectionId,
    message,
    setMessage,
    connection,
    sendMsg,
    join
};
  
  

}

export default UsePeer

/**

  (

    <div>usePee
        <input onChange={(e)=>setConnectionId(e.target.value)}></input>
        <button onClick={()=>join()}>Sumit</button>
        <p>          </p>
        <button onClick={()=>sendMsg()}>hello</button>
        <p>{peerID}</p>
        <p>{peer.id}</p>
    </div>
    
  )
 */