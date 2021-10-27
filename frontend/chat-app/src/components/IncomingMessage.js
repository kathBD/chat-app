import React from 'react'
import Datatime from '../helpers/Datatime'

 const IncomingMessage = ({ msg }) => {
    return (
      
          <div className="incoming_msg">
            <div className="incoming_msg_img">
                <img src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png" alt="sunil" />
            </div>
            <div className="received_msg">
                <div className="received_withd_msg">
                    <p>{ msg.mensaje }</p>
                    <span className="time_date"> {Datatime(msg.createAt)}</span>
                </div>
            </div>
        </div>
            
    
    )
}

export default IncomingMessage
