
import NavBar from '../NavBar';
import React, { useEffect, useState } from 'react'
import DocumentoIndividual from '../documento/DocumentoIndividual'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

function DocumentosTramite() {


    var idTRAM = '';
    const params = useParams()
    idTRAM = params.idTramite;

    const navegar = useNavigate()

    var cont = 0;
    //Hooks

    // estan cargados con objects
    const [documentosBD, setDocumentosBD] = useState([]);
    const [dataDocumentosTram, setdataDocumentosTram] = useState([])

    //encargados de editar el tramite
    const [descripcion, setDescripcion] = useState('')
    const [estado, setEstado] = useState('A')
    const [documentosTRAM, setDocumentosTRAM] = useState([]);


    useEffect(() => {

        axios.post('/api/usuario/obtenertramite', { idTramite: params.idTramite }).then(res => {
            const datatramite = res.data[0]
            setDescripcion(datatramite.descripcion)
            setDocumentosTRAM(datatramite.documentos)
            var documentos1 = datatramite.documentos;

            if (cont < 1) {  // esto por que se duplica la lista puesto que el use efect se aplica 2 veces
                cont++;
                documentos1.map(documento => {
                    let idDocumento  = documento;
                    axios.post('/api/usuario/obtenerdatadocumento', { idDocumento }).then(res => {
                        if(res.data[0] != undefined){
                        setdataDocumentosTram(dataDocumentosTram => dataDocumentosTram.concat(res.data[0]));
                        }
                    })
                })
            }
        })

        axios.get('/api/usuario/obtenerdocumentos').then(res => {
            //console.log(res.data)
            setDocumentosBD(res.data)
        }).catch(err => { console.log(err) }
        ) // min 1:39:38

    }, [])


    //mapear listadocumentosdep en objeto usuario
    const listadocumentosdep = dataDocumentosTram.map(documento => {
        return (
            <div>
                <DocumentoIndividual documento={documento} idTramite = {params.idTramite}/>
            </div>
        )
    })


    const listadocumentos = documentosBD.map(documento => {

        //console.log(documento.idDocumento);
        // console.log(documentosTRAM);
        
        if (undefined != documentosTRAM.find(element => element == documento.idDocumento)) {
            return <></>
        }
        else {

            return (
                <option value={documento.idDocumento}>{documento.detalles}</option>
            )
         }
    })


    function editarTramite() {

        if(document.getElementById("select").value != ""){
        //console.log(document.getElementById("select").value)
        // setDocumentosTRAM( documentosTRAM => documentosTRAM.concat( document.getElementById("select").value) )
        documentosTRAM.push(document.getElementById("select").value)
        console.log(documentosTRAM)

        // Nuevo objeto para actualizar usuario
        const actualizartramite = {
            idTramite: idTRAM,
            descripcion: descripcion,
            estado: estado,
            documentos: documentosTRAM
        }

        // hacer peticion usando axios
        axios.post('/api/usuario/actualizarTramite', actualizartramite)
            .then(res => {
                console.log(res.data)
                // actualizar documentos en pantalla
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
                text: 'No existen más documentos a agregar!',
               
              })
        }
    
        
    }


    return (

        <div>
            <NavBar />

            <div className='acomodar-resultados-2'>
                {listadocumentosdep}
            </div>

            <div className='sticky' >
                <h3 className='Titulos'> Documentos de Tramite</h3>
                <a className="btn-insertar" href="/agregardocumentos">Crear Documento</a>
                <br />
                <hr />
                <select id="select" className="btn-seleccion" aria-label="Default select example" >
                    {listadocumentos}
                </select>
                <br />
                <button className="btn btn-success" onClick={editarTramite}>Agregar Documento Existente</button>
                <br /><hr/>
                
            </div>

            {/* <ul className="nav nav-tabs">
                <li className="nav-item">
                    <a className="tabs" href={`/editartramite/${idTRAM}`}>Informacion Tramite</a>
                </li>
                <li className="nav-item">
                    <a className="tabs" href={`/editarcasostramite/${idTRAM}`}>Casos</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#">Documentos</a>
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
                                    <a className="nav-link" href={`/editarcasostramite/${idTRAM}`}>Casos</a>
                                </li>
                                <li className="nav-item">
                                    <a className="tabs" aria-current="page" href="#">Documentos</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </div>

    )
}


export default DocumentosTramite