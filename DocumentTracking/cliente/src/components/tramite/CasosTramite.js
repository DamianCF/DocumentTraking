
import NavBar from '../NavBar';
import React, { useEffect, useState } from 'react'
import CasoIndividual from '../caso/CasoIndividual'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'


function Casostramite() {

    var idTRAM = '';
    const params = useParams()
    idTRAM = params.idTramite;

    const navegar = useNavigate()

    var cont = 0;
    //Hooks

    // estan cargados con objects
    const [casosBD, setCasosBD] = useState([]);
    const [dataCasosTram, setdataCasosTram] = useState([])

    //encargados de editar el tramite
    const [descripcion, setDescripcion] = useState('')
    const [estado, setEstado] = useState('A')
    const [casosTRAM, setCasosTRAM] = useState([]);
    
    useEffect(() => {

        axios.post('/api/usuario/obtenertramite', { idTramite: params.idTramite }).then(res => {
            const datatramite = res.data[0]
            setDescripcion(datatramite.descripcion)
            setCasosTRAM(datatramite.casos)
            var casos1 = datatramite.casos;

            if (cont < 1) {  // esto por que se duplica la lista puesto que el use efect se aplica 2 veces
                cont++;
                casos1.map(caso => {
                    axios.post('/api/usuario/obtenercaso', { caso }).then(res => {
                        setdataCasosTram(dataCasosTram => dataCasosTram.concat(res.data[0]));
                    })
                })
            }
        })

        axios.get('/api/usuario/obtenerCasos').then(res => {
            //console.log(res.data)
            setCasosBD(res.data)
        }).catch(err => { console.log(err) }
        ) // min 1:39:38

    }, [])


    //mapear listacasosdep en objeto usuario
    const listacasosdep = dataCasosTram.map(caso => {
        return (
            <div>
                <CasoIndividual caso={caso} />
            </div>
        )
    })


    const listacasos = casosBD.map(caso => {

        if (undefined != casosTRAM.find(element => element == caso.idCaso)) {
            //console.log(caso.descripcion);
            return <></>
        }
        else {

            return (
                <option value={caso.idCaso}>{caso.numCaso}</option>
            )
        }
    })


    function editarTramite() {

        if(document.getElementById("select").value != ""){
        //console.log(document.getElementById("select").value)
        // setCasosTRAM( casosTRAM => casosTRAM.concat( document.getElementById("select").value) )
        casosTRAM.push(document.getElementById("select").value)
        console.log(casosTRAM)

        // Nuevo objeto para actualizar usuario
        const actualizartramite = {
            idTramite: idTRAM,
            descripcion: descripcion,
            estado: estado,
            casos: casosTRAM
        }

        // hacer peticion usando axios
        axios.post('/api/usuario/actualizarTramite', actualizartramite)
            .then(res => {
                console.log(res.data)
                // actualizar casos en pantalla
                navegar(0)

            })
            .then(err => {
                if (err) {
                    console.log(err)
                }
            })
        }else {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'No existen más casos a agregar!',
               
              })
        }
    }


    return (

        <div>

            <NavBar />
            <div className='acomodar-resultados-2'>
                {listacasosdep}
            </div>
            

            <div className='sticky'>
                <h3 className='Titulos'> Casos de Tramite</h3>
                <a className="btn-insertar" href="/agregarCaso">Crear Caso</a><hr/>
                <select id="select" className="btn-seleccion" aria-label="Default select example" >
                    {listacasos}
                </select>
                <br />
                <button className="btn btn-success" onClick={editarTramite}>Agregar Caso Existente</button>
                <br /><hr/>
            </div>

            {/* <ul className="nav nav-tabs">
                <li className="nav-item">
                    <a className="tabs" href={`/editartramite/${idTRAM}`}>Informacion Tramite</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#">Casos</a>
                </li>
                <li className="nav-item">
                    <a className="tabs" href={`/editardocumentostramite/${idTRAM}`}>Documentos</a>
                </li>
            </ul> */}

            <div>
                <nav className="nav-tabs navbar navbar-expand-lg navbar-dark bg-dark navbar-fixed-top">
                    <div className="container">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" class="bi bi-box-arrow-in-left" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M10 3.5a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 1 1 0v2A1.5 1.5 0 0 1 9.5 14h-8A1.5 1.5 0 0 1 0 12.5v-9A1.5 1.5 0 0 1 1.5 2h8A1.5 1.5 0 0 1 11 3.5v2a.5.5 0 0 1-1 0v-2z"/>
                            <path fill-rule="evenodd" d="M4.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H14.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
                        </svg>
                        <a className="navbar-brand" href="/tramites"> Tramites</a>

                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <a className="nav-link" href={`/editartramite/${idTRAM}`}>Informacion Tramite</a>
                                </li>
                                <li className="nav-item">
                                    <a className="tabs" aria-current="page" href="#">Casos</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href={`/editardocumentostramite/${idTRAM}`}>Documentos</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>

           

        </div>

    )
}


export default Casostramite