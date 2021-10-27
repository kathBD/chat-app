import React , { useContext } from 'react'
import Inbox from '../../components/Inbox'
import Messages from '../../components/Messages'
import SelectChat from '../../components/SelectChat'
import { ChatContext } from '../../context/ChatContext'


import './Chat.css'

const Chat = () => {

  const { chatState } = useContext( ChatContext );
    return (

      <div className="messaging">
      <div className="inbox_msg">

          <Inbox />

          {
              ( chatState.chatActivo )
                  ? <Messages />
                  : <SelectChat />
          }
          

      </div>


      </div>

        
     
    )
}

export default Chat
