import React, { useEffect, useState } from "react";
import Logo from "../img/logo.png";
import Flecha from "../img/Shape.png";
import GoogleSvg from "../img/icons8-google.svg";
// import { FaEye } from "react-icons/fa6";
// import { FaEyeSlash } from "react-icons/fa6";



const Login = () => {
  const [ showPassword, setShowPassword ] = useState(false);


  return (
    <div className="login-main">

      <div className="login-right">
        <div className="login-right-container">
          <div className="login-logo">
            <img src={Logo} alt="" />
          </div>
          <div className="login-center">
            <h2>Registrate</h2>
            <p>Crea una nueva cuenta</p>
            <form>
              <input type="username" placeholder="Nombre de usuario" />
              <input type="email" placeholder="Correo electronico" />
              <input type="number" placeholder="Número de telefono" />

              <div className="pass-input-div">
                <input type={showPassword ? "text" : "password"} placeholder="Contraseña" />
            {/*  {showPassword ? <FaEyeSlash onClick={() => {setShowPassword(!showPassword)}} /> : <FaEye onClick={() => {setShowPassword(!showPassword)}} />} */}   
                
              </div>

              <div className="login-center-options">
              <div className="remember-div-r">
  <input type="checkbox" id="remember-checkbox" />
  <label htmlFor="remember-checkbox-r">Al seleccionar la casilla estás aceptando nuestros Términos y Condiciones.</label>
</div>

           
              </div>
              <div className="login-center-buttons"> {/* Esto tiene que cambiar a otro estilo cuando Email y Password este lleno*/}
                <button type="button">Registrarme <img className="Flechita" src={Flecha}></img> </button>
              {/* <button type="button">
                  <img src={GoogleSvg} alt="" />
                  Log In with Google
                </button>*/}  
              </div>
            </form>
          </div>

          <p className="login-bottom-p">
            ¿Ya tienes cuenta? <a href="#">Iniciar sesión</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;