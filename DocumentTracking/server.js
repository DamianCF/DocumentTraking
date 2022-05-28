const express = require('express')
const app = express()

//IMportar conexion MOngoDb
const archivoBD = require('./conexion')

// importacion de archivos de rutas y modelo de usuario
const rutausuario= require ('./rutas/usuario')

//importar body-parser
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:'true'}))

app.use('/api/usuario', rutausuario)

app.get('/', (req, res)=>{
    res.end('Bienvenodos al sevidor backend Node.js. Corriendo')

})

// configurar server basico
app.listen(5000, function(){
    console.log('El servidor  NODE esta corriendo correctamente')
})