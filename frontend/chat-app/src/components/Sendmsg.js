import React, {useContext, useState}from "react";
import { AuthContext } from "../auth/AuthContext";
import{ Socketcontext } from '../context/Socketcontext'
import { ChatContext } from "../context/ChatContext";

const Sendmsg = () => {

  const [ mensaje, setMensaje ] = useState('');

  const { socket } = useContext( Socketcontext );
  const { auth } = useContext( AuthContext );
  const { chatState } = useContext( ChatContext );



  const onChange = ({ target }) => {
    setMensaje( target.value );
}


const onSubmit = (ev) => {
    ev.preventDefault();

    if ( mensaje.length === 0 ){ return; }
    setMensaje('');


    socket.emit( 'mensaje-personal', {
      de: auth.uid,
      para: chatState.chatActivo,
      mensaje
  });

}
  return (
    <div>
      <form onSubmit={ onSubmit }>
        <div className="type_msg row">
          <div className="input_msg_write col-sm-9">
            <input type="text" className="write_msg" placeholder="Mensaje..." value={ mensaje }
                        onChange={ onChange }/>
          </div>
          <div className="col-sm-3 text-center">
            <button className="msg_send_btn mt-3" type="submit">
              Enviar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Sendmsg;
