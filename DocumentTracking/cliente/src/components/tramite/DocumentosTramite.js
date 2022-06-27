
import NavBar from '../NavBar';
import React, { useEffect, useState } from 'react'
import DocumentoIndividual from '../documento/DocumentoIndividual'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'



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
                        setdataDocumentosTram(dataDocumentosTram => dataDocumentosTram.concat(res.data[0]));
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
                <DocumentoIndividual documento={documento} />
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
    }


    return (

        <div>
            <NavBar />

            <h3 className='Titulos'> Documentos de Tramite</h3>
            
            <div >
                <a className="btn-insertar" href="/agregardocumentos">Crear Documento</a>
                <br />
                <hr />
                <select id="select" className="btn-seleccion" aria-label="Default select example" >
                    {listadocumentos}
                </select>
                <br />
                <button className="btn btn-success" onClick={editarTramite}>Agregar Documento Existente</button>
                <br />
                
            </div>

            <ul className="nav nav-tabs">
                <li className="nav-item">
                    {/* <a className="nav-link" href="#">Informacion Tramite</a> */}
                    <a className="tabs" href={`/editartramite/${idTRAM}`}>Informacion Tramite</a>
                </li>
                <li className="nav-item">
                    {/* <a className="nav-link" href="/">Documentos</a> */}
                    <a className="tabs" href={`/editarcasostramite/${idTRAM}`}>Casos</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#">Documentos</a>
                </li>
            </ul>


            <div>
                {listadocumentosdep}
            </div>

        </div>

    )
}


export default DocumentosTramite