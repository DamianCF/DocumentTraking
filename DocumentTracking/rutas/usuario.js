const express = require ('express')
const router = express.Router()

const mongoose = require('mongoose')
const { model } = require('../conexion')
const eschema  = mongoose.Schema

const eschemausuario = new eschema({
    idEmpleado: String,
    clave: String,
    estado: String
})

const ModeloUsuario = mongoose.model('usuarios', eschemausuario)
module.exports = router



/* Ruta de prueba
router.get('/ejemplo', (req,res)=>{
    res.end('Saludo carga desde ruta ejemplo')
}) */



//Agregar Usuario
router.post('/agregarusuario', (req, res) => {

    const nuevousuario = new ModeloUsuario({
        idEmpleado: req.body.idEmpleado,
        clave: req.body.clave,
        estado: req.body.estado
    })

    nuevousuario.save(function(err){
        if(!err){ 
            res.send('Usuario agregado correctamente')
        }else{
            res.send(err)
        }
    })
})


// obtener todos los usuarios

router.get('/obtenerusuarios', (req, res) =>{
    ModeloUsuario.find({}, function (docs , err){
        if(!err){
            res.send(docs)
        }else{
            res.send(err)
        }
    })
} )

// obtener data de usuario

router.post('/obtenerdatausuario', (req, res) =>{
    ModeloUsuario.find({idusuario:req.body.idusuario}, function (docs , err){
        if(!err){
            res.send(docs)
        }else{
            res.send(err)
        }
    })
} )


//Actualiza Usuario
router.post('/actualizausuario', (req, res) => {

    ModeloUsuario.findOneAndUpdate({idusuario:req.body.idusuario},{
        nombre: req.body.nombre,
        email: req.body.email,
        telefono: req.body.telefono

    }, (err)=>{
            if(!err){
                res.send('Usuario actualizado correctamente')
            }else{
                res.send(err)
            }
    })
})


//Borrar Usuario
router.post('/borrarusuario', (req, res) => {

    ModeloUsuario.findOneAndDelete({idusuario:req.body.idusuario},(err)=>{
        if(!err){
            res.send('Usuario borrado correctamente')
        }else{
            res.send(err)
        }
    })
})