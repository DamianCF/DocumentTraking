import React, { useState } from 'react'
import uniquid from 'uniquid'
import axios from 'axios'
import Swal from 'sweetalert2'
import NavBar from '../NavBar';

function AgregarDocumentos() {

    //Hooks 
   
    const [detalles, setDetalles] = useState('')
    const [estado, setEstado] = useState('A')
    const [ubicacion, setUbicacion] = useState('')



    function agregarDocumentos() {
        var documento = {

            estado: estado,
            detalles: detalles,
            ubicacion: ubicacion,
            idDocumento: uniquid()
         
          

        }

        console.log(documento)

        axios.post('/api/usuario/agregardocumento', documento)
            .then(res => {
                //alert(res.data)
                Swal.fire('Felicidades', 'El documento se creo con exito')
            })
            .then(err => { console.log(err) })
    }

    function guardarArchivo(e) {
        var file = e.target.files[0] //the file
        var reader = new FileReader() //this for convert to Base64 
        reader.readAsDataURL(e.target.files[0]) //start conversion...
        reader.onload = function (e) { //.. once finished..
          var rawLog = reader.result.split(',')[1]; //extract only thee file data part
          var dataSend = { dataReq: { data: rawLog, name: file.name, type: file.type }, fname: "uploadFilesToGoogleDrive" }; //preapre info to send to API
          fetch('https://script.google.com/macros/s/AKfycbyQplpVqVX_wM6lgPHe1Y1SzIMaBVi5ADkPWFm-FwHbT-UDAa0KxUmdaanUk_RoKt0/exec', //your AppsScript URL
            { method: "POST", body: JSON.stringify(dataSend) }) //send to Api
            .then(res => res.json()).then((a) => {
              console.log(a) //See response
            console.log(a.url) //See response
            setUbicacion(a.url)
            }).catch(e => console.log(e)) // Or Error in console
        }
      }

    return (

        <>
            <NavBar />
            <div className='container'>
                <h1> CREAR UN DOCUMENTO</h1>
                <div className='row'>
                    <h2 className='mt-4'> Crear nuevo documento</h2>
                </div>

                <div className='row'>
                    <div className='col-sm-6 offset-3'>


                        <div className='mb-3'>
                            <label htmlFor='detalles' className='form-label'>detalles</label>
                            <input type="text" className='form-control' value={detalles} onChange={(e) => { setDetalles(e.target.value) }}></input>
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='ubicacion' className='form-label'>ubicacion</label>
                            <input type="text" className='form-control' value={ubicacion} onChange={(e) => { setUbicacion(e.target.value) }}></input>
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='estado' className='form-label'>estado</label>
                            <input type="text" className='form-control' value={estado} onChange={(e) => { setEstado(e.target.value) }}></input>
                        </div>


                        {/* 
        <div className='mb-3'>
            <label htmlFor='tramites' className='form-label'>Tramites</label>
            <input type="text" className='form-control' value = {tramites} onChange = {(e)=>{setTramites(e.target.value )}}></input>
        </div> */}
          
                    
                    <hr/>
                    <a className="nav-link" href={ubicacion} > {ubicacion}  </a>
              
            <input type="file" accept="application/allfilles" id="customFile" onChange={(e) => guardarArchivo(e)} />
          
       

                        <button onClick={agregarDocumentos} className='btn btn-success'>Guardar documento</button>

                    </div>
                </div>
            </div>
        </>

    )
}

export default AgregarDocumentos