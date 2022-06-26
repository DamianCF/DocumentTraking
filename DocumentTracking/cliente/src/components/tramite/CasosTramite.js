
import NavBar from '../NavBar';
import React, { useEffect, useState } from 'react'
import CasoIndividual from '../caso/CasoIndividual'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'



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
    }


    return (

        <div>

            <NavBar />
            <br />
            <br />
            <br />
            <h3> Casos de Tramite</h3>

            <div >
                <br />
                <select id="select" className="form-select" aria-label="Default select example" >
                    {listacasos}
                </select>
                <br />
                <button className="btn btn-success" onClick={editarTramite}>Agregar Caso Existente</button>
                <br />
                <a className="nav-link" href="/agregarCaso">Crear Caso</a>
            </div>

            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <a className="nav-link" href={`/editartramite/${idTRAM}`}>Informacion Tramite</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#">Casos</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href={`/editardocumentostramite/${idTRAM}`}>Documentos</a>
                </li>
            </ul>

            <div>
                {listacasosdep}
            </div>

        </div>

    )
}


export default Casostramite