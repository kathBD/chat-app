
import React, {useContext} from 'react'
import { ChatContext } from '../context/ChatContext';
import { fetchwithToken } from '../helpers/fetch';
import { scrollToBottom } from '../helpers/scrollToBottom';

import { types } from '../types/types.js';


const ChatItem = ({ usuario }) => {
    const { chatState, dispatch } = useContext( ChatContext );
    const { chatActivo } = chatState;

    const onClick = async() => {

        dispatch({
            type: types.activarChat,
            payload: usuario.uid
        });

    
    const resp = await fetchwithToken(`mensajes/${ usuario.uid }`);
    dispatch({
        type: types.cargarMensajes,
        payload: resp.mensajes
    });

    scrollToBottom('mensajes');
    }


    return (
        <div className={`chat_list ${ (usuario.uid === chatActivo) && 'active_chat' }`}
        onClick={ onClick }>
        <div className="chat_people">
            <div className="chat_img"> 
                <img src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png" alt="sunil" />
            </div>
            <div className="chat_ib">
                <h5>{ usuario.name }</h5>
                {
                        ( usuario.online )
                            ? <span className="text-success">Online</span>
                            : <span className="text-danger">Offline</span>
                    }
            </div>
        </div>
    </div>
    )
}

export default ChatItem
