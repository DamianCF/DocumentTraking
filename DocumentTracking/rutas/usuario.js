const express = require ('express')
const router = express.Router()

const mongoose = require('mongoose')
const { model } = require('../conexion')
const eschema  = mongoose.Schema

const eschemausuario = new eschema({
    idEmpleado: {type: String ,required: true},
    clave: {type: String ,required: true},
    estado: {type: String , enum: ['A', 'I'] , default : 'A' ,required: true}
})

const ModeloUsuario = mongoose.model('usuarios', eschemausuario)
module.exports = router

//Agregar Usuario
router.post('/agregarusuario', (req, res) => {

    const nuevousuario = new ModeloUsuario({
        idEmpleado: req.body.idEmpleado,
        clave: req.body.clave,
        estado: req.body.estado
    })

    console.log('Informacion del Body');
    console.log(req.body)

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
    ModeloUsuario.find({idEmpleado:req.body.idEmpleado}, function (docs , err){
        if(!err){
            res.send(docs)
        }else{
            res.send(err)
        }
    })
} )


//Actualiza Usuario
router.post('/actualizausuario', (req, res) => {

    ModeloUsuario.findOneAndUpdate({idEmpleado:req.body.idEmpleado},{
        idEmpleado: req.body.idEmpleado,
        clave: req.body.clave,
        estado: req.body.estado

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

    ModeloUsuario.findOneAndDelete({idEmpleado:req.body.idEmpleado},(err)=>{
        if(!err){
            res.send('Usuario borrado correctamente')
        }else{
            res.send(err)
        }
    })
})
