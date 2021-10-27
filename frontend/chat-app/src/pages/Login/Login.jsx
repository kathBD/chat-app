
import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../auth/AuthContext";
import "./Login.css";
import Swal from 'sweetalert2';

const Login = () => {

 const {login} = useContext(AuthContext);

 const  [formlogin, setFormlogin] = useState({
      email:" ",
      password:" ",
      remenberme:false

 });
  
 useEffect(() => {
  const email = localStorage.getItem('email');
  if ( email ) {
      setFormlogin( (formlogin) => ({
          ...formlogin,
          email,
          rememberme: true,
      }));
  }

}, [])

 const onChange=({target}) =>{
   const{name, value }= target;

    setFormlogin({
      ...formlogin,
        [name]:value
    })
   
 }
 const toggleCheck =()=>{
   setFormlogin({
     ...formlogin,
     remenberme: !formlogin.remenberme
   });
 }


const onSubmit =async(ev)=>{
  ev.preventDefault();

  (formlogin.remenberme) 
  ? localStorage.setItem('email', formlogin.email )
  : localStorage.removeItem('email');


  const{email, password}=formlogin;
   const ok = await login( email, password );
   if ( !ok ) {
    Swal.fire('Error', 'Verifique el usuario y contraseña', 'error');
}

}
const todoOk = () => {
  return ( formlogin.email.length > 0 && formlogin.password.length > 0 ) ? true : false;
 
}

  return (
    

    <div className="login" >
    <div className="loginWrapper">
      <div className="loginLeft">
        <h3 className="loginLogo">Intopcol</h3>
        <span className="loginDesc">
          Chat  empresa Intocol
        </span>
      </div>
      <div className="text">
            <span className="login100-form-title mb-3">
                Chat - Ingreso
            </span>
            </div>
      <div className="loginRight">
        <form className="login100-form validate-form flex-sb flex-w" onSubmit={onSubmit}>
          <input
            placeholder="Email"
            type="email"
          
            name="email"
            className="loginInput"
            checked={formlogin.email}
            onChange={ onChange }
     
          
          />
          <input
            placeholder="Password"
            type="password"
            required
            name="password"
            className="loginInput"
            value={formlogin.password}
            onChange={onChange}
          
          />
            <div className="row mb-3">
                <div 
                    className="col"
                    onClick={()=>toggleCheck()}
                   
                >
                    <input
                        className="input-checkbox100"
                        id="ckb1"
                        type="checkbox"
                        name="rememberme" 
                        value={formlogin.remenberme} 
                        readOnly
                    />
                    <label className="label-checkbox100">
                        Recordarme
                    </label>
                </div>
                </div>
          <div  >
          <Link to="/auth/register" className="Link">
              Crear nuevo registro?
              </Link>
          </div>
        
          <button 
          className="loginRegisterButton"
          type="submit"
          disabled={ !todoOk() }
          
          >
      
              "Ingresar"
     
          </button>
        </form>
      </div>
    </div>
            
    </div>
  )
}


export default Login
