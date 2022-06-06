const express = require ('express')
const router = express.Router()

const mongoose = require('mongoose')
const { model } = require('../conexion')
const eschema  = mongoose.Schema


const eschemaBitacora = new eschema({
    fechaIni: Date,
    fechaFin: Date
})

const eschemaControlFechasDepts = new eschema({
    idDepartamento: {type: String, required: true},
    fechaInicio: Date,
    fechaFinal: Date
})

const eschemaCaso = new eschema({
    idCaso:{type: String, required: true},
    idTramite: String,
    numCaso: String,
    detalle: String,
    estado:{type: String, enum: ['A', 'F'] , default : 'A' , required: true },
    bitacora: eschemaBitacora,
    ctrlFechas: [eschemaControlFechasDepts]
})





const ModeloCaso = mongoose.model('caso', eschemaCaso)
module.exports = router

//Agregar caso
router.post('/agregarCaso', (req, res) => {

    const nuevoCaso = new ModeloCaso({
        idCaso : req.body.idCaso,
        idTramite: req.body.idTramite,
        numCaso: req.body.numCaso,
        detalle: req.body.detalle,
        estado: req.body.estado,
        bitacora: req.body.bitacora,
        ctrlFechas: req.body.ctrlFechas
    })
    nuevoCaso.save(function(err){
        if(!err){ 
            res.send('Caso agregado correctamente')
        }else{
            res.send(err)
        }
    })
})

// obtener todas los caso
router.get('/obtenerCasos', (req, res) =>{
    ModeloCaso.find({}, function (docs , err){
        if(!err){
            res.send(docs)
        }else{
            res.send(err)
        }
    })
} )

// obtener data de caso 
router.post('/obtenerdataCaso', (req, res) =>{
    ModeloCaso.find({idCaso:req.body.idCaso}, function (docs , err){
        if(!err){
            res.send(docs)
        }else{
            res.send(err)
        }
    })
} )

//Actualiza caso
router.post('/actualizarCaso', (req, res) => {

    ModeloCaso.findOneAndUpdate({idCaso:req.body.idCaso},{
        idCaso : req.body.idCaso,
        idTramite: req.body.idTramite,
        numCaso: req.body.numCaso,
        detalle: req.body.detalle,
        estado: req.body.estado,
        bitacora: req.body.bitacora,
        ctrlFechas: req.body.ctrlFechas
    }, (err)=>{
            if(!err){
                res.send('Casos actualizado correctamente')
            }else{
                res.send(err)
            }
    })
})

//Borrar caso
router.post('/borrarCaso', (req, res) => {

    ModeloCaso.findOneAndDelete({idCaso:req.body.idCaso},(err)=>{
        if(!err){
            res.send('Caso Borrado correctamente')
        }else{
            res.send(err)
        }
    })
})