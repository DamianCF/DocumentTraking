import React from 'react'
import NavBar from '../NavBar';


function ListarDocumentos() {

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
        }).catch(e => console.log(e)) // Or Error in console
    }
  }

  return (
    <>
    <div>
            <NavBar/>

            <div>
                <h1 class="Titulos">
                    DOCUMENTOS 
                </h1>
                <a className="nav-link" href="/agregarDocumentos">Agregar Documentos</a>
                <hr/>
                
          
        <input type="file" accept="application/pdf" id="customFile" onChange={(e) => guardarArchivo(e)} />
      </div>
    </div>
    </>
  );
}

export default ListarDocumentos