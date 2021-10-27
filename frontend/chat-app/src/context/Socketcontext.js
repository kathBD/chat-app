import React, { useContext, useEffect } from 'react';
import { createContext } from 'react';
import  {ChatContext}  from './ChatContext';
import { AuthContext}  from '../auth/AuthContext';
import UseSocket from '../hooks/UseSocket'
import  {types}  from '../types/types.js';
import {scrollToBottomAnimated} from '../helpers/scrollToBottom';



export const Socketcontext = createContext();

export const SocketProvider = ({ children }) => {

    const { socket, online, conectarSocket, desconectarSocket } = UseSocket('http://localhost:8080');
    const { auth } = useContext( AuthContext );
    const { dispatch } = useContext( ChatContext );

    useEffect(() => {
        if ( auth.logged ) {
            conectarSocket();
        }
    }, [ auth, conectarSocket ]);

    useEffect(() => {
        if ( !auth.logged ) {
            desconectarSocket();
        }
    }, [ auth, desconectarSocket ]);

    useEffect(() => {
        
        socket?.on( 'lista-usuarios', (usuarios) => {
            dispatch({
                type: types.usuariosCargados,
                payload: usuarios
            });
        })

    }, [ socket, dispatch ]);


    useEffect(() => {
        socket?.on('mensaje-personal', (mensaje) => {
            dispatch({
                type: types.nuevoMensaje,
                payload: mensaje
            });

            scrollToBottomAnimated('mensajes');
        })

    }, [ socket, dispatch ]);

    return (
        <Socketcontext.Provider value={{ socket, online }}>
            { children }
        </Socketcontext.Provider>
    )
}