import React, { useState } from 'react'
import uniquid from 'uniquid'
import axios from 'axios'
import Swal from 'sweetalert2'

function Login() {
    return (

        <div class="container">
            <div class="row">
                <div class="col-md-4 offset-md-4">
                    <div class="login-form bg-light mt-4 p-4">
                        <form action="" method="" class="row g-3">
                            <h4>Inicio de sesion</h4>
                            <div class="col-12">
                                <label>Usuario</label>
                                <input type="text" name="username" class="form-control" placeholder="Username"/>
                            </div>
                            <div class="col-12">
                                <label>Clave</label>
                                <input type="password" name="password" class="form-control" placeholder="Password"/>
                            </div>
                            <div class="col-12">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="rememberMe"/>
                                        <label class="form-check-label" for="rememberMe"> Recordarme</label>
                                </div>
                            </div>
                            <div class="col-12">
                                <button type="submit" class="btn btn-dark float-end">iniciar</button>
                            </div>
                        </form>
                        <hr class="mt-4"/>
                            <div class="col-12">
                                <p class="text-center mb-0">Have not account yet? <a href="#">Registrarse</a></p>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login