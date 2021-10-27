import React from 'react'
import Datatime from '../helpers/Datatime'

const OutgoingMessage = ({ msg }) => {
    return (
        <>
              <div className="outgoing_msg">
            <div className="sent_msg">
                <p>{ msg.mensaje }</p>
                <span className="time_date">{Datatime(msg.createdAt)}</span>
            </div>
        </div>
        </>
    )
}

export default OutgoingMessage
