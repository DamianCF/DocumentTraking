import React, { useState } from 'react'
import axios from 'axios'


function Login() {

    const [cedula, setCedula] = useState('');
    const [clave, setClave] = useState('');


    function validarEmpleado() {

        /// PROBLEMAS CON LIMPIAR ESTO
        sessionStorage.clear();
        localStorage.clear();

        axios.post('/api/usuario/obtenerdataempleadologin', { cedula: cedula, clave: clave , estado: "A" }).then(res => {

            console.log(res.data[0])
            const datausuario = res.data[0]

            if (res.data[0] && datausuario.cedula == cedula && datausuario.clave == clave ) { 
                sessionStorage.setItem("idEmpleado", datausuario.idEmpleado);
                sessionStorage.setItem("nombre", datausuario.nombre);
                sessionStorage.setItem("pApellido", datausuario.pApellido);
                sessionStorage.setItem("cedula", datausuario.cedula);
                sessionStorage.setItem("rol", datausuario.rol);

                console.log(localStorage.getItem("idEmpleado"));
                window.location.href = "/principal";

            } else {
                alert("cedula  o contraseña incorrecta");
            }



        }).catch(err => { console.log(err) }
        )

        setCedula('');
        setClave('');
    }



    return (

        <div className="container">
            <br />
            <div className="Login">
                <h1>Document Tracking</h1>
            </div>

            <div className="row">
                <div className="col-md-4 offset-md-4">
                    <div className="login-form bg-light mt-4 p-4">
                        <form action="" method="" className="row g-3">
                            <h4>Inicio de Sesion</h4>
                            <div className="col-12">
                                <label htmlFor='cedula'>Cedula</label>
                                <input type="text" name="cedula" id="cedula" className="form-control" placeholder="Cedula" value={cedula} onChange={(e) => { setCedula(e.target.value) }} />
                            </div>
                            <div className="col-12">
                                <label htmlFor='password'>Clave</label>
                                <input type="password" name="password" id="password" className="form-control" placeholder="Contraseña" value={clave} onChange={(e) => { setClave(e.target.value) }} />
                            </div>
                            <div className="col-12">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="rememberMe" />
                                    <label className="form-check-label" htmlFor="rememberMe"> Recordarme</label>
                                </div>
                            </div>
                            <button type="button" className="btn btn-dark float-end" onClick={validarEmpleado}>Iniciar</button>
                        </form>
                        <hr className="mt-4" />
                        <div className="col-12">
                            <p className="text-center mb-0">No estas registrado? <a href="#">Registrarse</a></p>
                        </div>
                    </div>
                </div>
            </div>


        </div>

    )
}

export default Login