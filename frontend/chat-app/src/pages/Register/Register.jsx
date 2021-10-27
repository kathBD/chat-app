import React, { useContext, useState } from 'react'

import { Link } from 'react-router-dom'
import { AuthContext } from '../../auth/AuthContext';
import './Register.css'
import Swal from 'sweetalert2';

const Register = () => {

  const { register } = useContext( AuthContext );
  const  [form, setForm] = useState({
    email:"",
    password:" ",
    name: ""

});


const onChange=({target}) =>{
 const{name, value }= target;

  setForm({
    ...form,
      [name]:value
  })
 
}


const onSubmit =async(ev)=>{
ev.preventDefault();

const{name,email, password }=form;

 const msg = await register( name, email, password );

 if ( msg !== true ) {
     Swal.fire('Error', msg, 'error');
 }
}

const todoOk = () => {
return ( form.email.length > 0 
  && form.password.length > 0 
  && form.name.length > 0) 
  ? true : false;

}




    return (
      <>
          <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Intopcol</h3>
          <span className="login100-form-title mb-3">
                Chat - Registro
            </span>
         
        </div>
        <div className="loginRight">
          <form className="loginBox"  onSubmit={ onSubmit }>
            <input 
             className="loginInput"
              type="text"
              name="name"
              placeholder="Nombre"
              value={ form.name }
              onChange={ onChange }
             
            />
            <input
             className="loginInput"
             type="email"
             name="email"
             placeholder="Email" 
             value={ form.email }
             onChange={ onChange }
            />
            <input
              className="loginInput"
              type="password"
              name="password"
              placeholder="Password" 
              value={ form.password }
              onChange={ onChange }
            />
           
            <button className="loginButton" type="submit"   disabled={ !todoOk() }>
              Registrarse
            </button>
           <div className="row mb-3 " id='color'>
             <Link to="/auth/login" className="link">Iniciar sesión</Link> 
           </div>
          </form>
        </div>
      </div>
    </div>
       
   
      </>
      
        
    )
}

export default Register
