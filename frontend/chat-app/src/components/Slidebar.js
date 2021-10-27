import React, {useContext} from 'react'
import ChatItem from './ChatItem'
import { AuthContext } from '../auth/AuthContext'
import { ChatContext } from '../context/ChatContext'

const Slidebar = () => {

    const { chatState } = useContext( ChatContext );
    const { auth } = useContext( AuthContext );

    const { uid } = auth;

    return (
        <>
             <div className="inbox_chat">

  {
                chatState.usuarios
                    .filter( user => user.uid !== uid )
                    .map( (usuario) => (
                    <ChatItem 
                        key={ usuario.uid }
                        usuario={ usuario }
                    />
                ))
            }

<div className="extra_space"></div>


</div>
            
        </>
    )
}

export default Slidebar
