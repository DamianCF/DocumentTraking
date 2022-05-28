const express = require ('express')
const router = express.Router()

const mongoose = require('mongoose')
const { model } = require('../conexion')
const eschema  = mongoose.Schema

const eschemasucursal = new eschema({
    nombre:{type: String, required: true},
    provincia: String,
    canton: String,
    distrito: String,
    direccion: String
})

const eschemagerencia = new eschema({
    idGerenteGeneral : {type: String, required: true , unique: true},
    gerentes: [String]
})

const eschemacontacto = new eschema({
    telefono: Number,
    correo: String
})

const eschemaempresa = new eschema({
    idEmpresa: {type: String, required: true , unique: true},
    nombre: {type: String, required: true },
    indoleNegocio: {type: String},
    cedulaJuridica:{type: String, required: true , unique: true}, 
    estado:{type: String, required: true },
    gerencia: eschemagerencia,
    contacto:eschemacontacto,
    sucursales:[eschemasucursal]
})

const ModeloEmpresa = mongoose.model('empresas', eschemaempresa)
module.exports = router

//Agregar Empresa
router.post('/agregarempresa', (req, res) => {

    const nuevaempresa = new ModeloEmpresa({
        idEmpresa : req.body.idEmpresa,
        nombre: req.body.nombre,
        indoleNegocio: req.body.indoleNegocio,
        cedulaJuridica: req.body.cedulaJuridica,
        estado: req.body.estado
    })
    nuevaempresa.save(function(err){
        if(!err){ 
            res.send('Empresa agregada correctamente')
        }else{
            res.send(err)
        }
    })
})


// obtener todas las empresas
router.get('/obtenerempresas', (req, res) =>{
    ModeloEmpresa.find({}, function (docs , err){
        if(!err){
            res.send(docs)
        }else{
            res.send(err)
        }
    })
} )

// obtener data de empresa
router.post('/obtenerdataempresa', (req, res) =>{
    ModeloEmpresa.find({idEmpresa:req.body.idEmpresa}, function (docs , err){
        if(!err){
            res.send(docs)
        }else{
            res.send(err)
        }
    })
} )

//Actualiza Usuario
router.post('/actualizarempresa', (req, res) => {

    ModeloEmpresa.findOneAndUpdate({idEmpresa:req.body.idEmpresa},{
        idEmpresa : req.body.idEmpresa,
        nombre: req.body.nombre,
        indoleNegocio: req.body.indoleNegocio,
        cedulaJuridica: req.body.cedulaJuridica,
        estado: req.body.estado
    }, (err)=>{
            if(!err){
                res.send('Empresa actualizada correctamente')
            }else{
                res.send(err)
            }
    })
})

//Borrar Empresa
router.post('/borrarempresa', (req, res) => {

    ModeloEmpresa.findOneAndDelete({idEmpresa:req.body.idEmpresa},(err)=>{
        if(!err){
            res.send('Empresa actualizada correctamente')
        }else{
            res.send(err)
        }
    })
})