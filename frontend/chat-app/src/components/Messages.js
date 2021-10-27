import React, { useContext }  from 'react'
import IncomingMessage from './IncomingMessage'
import Sendmsg from './Sendmsg'
import OutgoingMessage from './OutgoingMessage'
import {ChatContext }from '../context/ChatContext'
import {AuthContext} from '../auth/AuthContext'


const Messages = () => {

    const { chatState } = useContext( ChatContext );
    const { auth } = useContext( AuthContext );
    return (
        
            <div className="mesgs">


<div 
     id="mensajes"
     className="msg_history">

    {
       chatState.mensajes.map( msg => (
        ( msg.para === auth.uid )
            ? <IncomingMessage key={ msg._id } msg={ msg } />
            : <OutgoingMessage key={ msg._id } msg={ msg } />
    ))
}

    

</div>

<Sendmsg/>
           </div> 
        
    )
}

export default Messages
