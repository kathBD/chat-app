import React, { createContext, useCallback, useState } from "react";

import { fetchwithoutToken, fetchwithToken } from "../helpers/fetch";


export const AuthContext= createContext();

    const initialState ={
        uid: null,
        checking:true, //user register true or not
        logged: false,
        name: null,
        email:null,
    };

    //auth method login, register 
    export const AuthProvider = ({children}) => {

      const  [auth, setAuth]=useState(initialState)

        const login = async(email, password)=>{

            const resp = await fetchwithoutToken('login',{email, password}, 'POST' );
            if ( resp.ok ) {
                localStorage.setItem('token', resp.token );
                const { usuario } = resp;
    
                setAuth({
                    uid: usuario.uid,
                    checking: false,
                    logged: true,
                    name: usuario.name,
                    email: usuario.email,
                });
            }
                return resp.ok;
        }

        const register= async(name, email, password)=>{
            const resp = await fetchwithoutToken ('login/new', { name, email, password }, 'POST');
        
            if ( resp.ok ) {
                localStorage.setItem('token', resp.token );
                const { usuario } = resp;
    
                setAuth({
                    uid: usuario.uid,
                    checking: false,
                    logged: true,
                    name: usuario.name,
                    email: usuario.email,
                });
    
                return true;

        }
        return resp.msg;
    }
        const renewToken= useCallback(async()=>{
            const token = localStorage.getItem('token');
           
            if ( !token ) {
              setAuth({
                    uid: null,
                    checking: false,
                    logged: false,
                    name: null,
                    email: null,
                })
    
                return false;
            }
            const resp = await fetchwithToken('login/renew');
            if ( resp.ok ) {
                localStorage.setItem('token', resp.token );
                const { usuario } = resp;
    
                setAuth({
                    uid: usuario.uid,
                    checking: false,
                    logged: true,
                    name: usuario.name,
                    email: usuario.email,
                });
    
                return true;
            } else {
                setAuth({
                    uid: null,
                    checking: false,
                    logged: false,
                    name: null,
                    email: null,
                    
                });
    
                return false;
            }
    
        }, [])

        const logout =()=>{
            localStorage.removeItem('token');
            setAuth({
                checking: false,
                logged: false,
            });

        }

        return (
           <AuthContext.Provider value={{
            auth,
            login,
            register,
            renewToken,
            logout,

           }}>
               {children}

           </AuthContext.Provider>
        )
    }
    