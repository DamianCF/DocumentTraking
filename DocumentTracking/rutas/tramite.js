const express = require ('express')
const router = express.Router()

const mongoose = require('mongoose')
const { model } = require('../conexion')
const eschema  = mongoose.Schema

const eschemaetapa = new eschema({
    idDepartamento:{type: String},//, required: true
    estadoAceptacion : String,
    detalles: String,
    isActual: Boolean
})

const eschematramite = new eschema({
    idTramite: {type: String, required: true , unique: true},
    descripcion: {type: String, required: true },
    estado:{type: String, enum: ['A', 'I'] , default : 'A' , required: true },
    casos:[String],
    documentos:[String],
    cicloTramite:[eschemaetapa]
})

const ModeloTramite = mongoose.model('tramites', eschematramite)
module.exports = router

//Agregar tramite
router.post('/agregartramite', (req, res) => {

    const nuevotramite = new ModeloTramite({
        idTramite : req.body.idTramite,
        descripcion: req.body.descripcion,
        estado: req.body.estado,
        casos: req.body.casos,
        documentos: req.body.documentos,
        cicloTramite: req.body.cicloTramite
    })
    console.log(nuevotramite)

    nuevotramite.save(function(err){
        if(!err){ 
            res.send('Tramite agregado correctamente')
        }else{
            res.send(err)
        }
    })
})

// obtener todas los tramites
router.get('/obtenertramites', (req, res) =>{
    ModeloTramite.find({}, function (docs , err){
        if(!err){
            res.send(docs)
        }else{
            res.send(err)
        }
    })
} )

// obtener data de tramite
router.post('/obtenertramite', (req, res) =>{
    console.log(req.body.idTramite);
    ModeloTramite.find({idTramite:req.body.idTramite}, function (docs , err){
        if(!err){
            res.send(docs)
        }else{
            res.send(err)
        }
    })
} )

// obtener data de tramite
router.post('/obtenerdatatramite', (req, res) =>{
    console.log(req.body.tramite)
    ModeloTramite.find({idTramite:req.body.tramite}, function (docs , err){
        if(!err){
            res.send(docs)
        }else{
            res.send(err)
        }
    })
} )

//Actualiza Tramite
router.post('/actualizarTramite', (req, res) => {

    ModeloTramite.findOneAndUpdate({idTramite:req.body.idTramite},{
        idTramite : req.body.idTramite,
        descripcion: req.body.descripcion,
        estado: req.body.estado,
        casos: req.body.casos,
        documentos: req.body.documentos,
        cicloTramite: req.body.cicloTramite
    }, (err)=>{
            if(!err){
                res.send('Tramite actualizado correctamente')
            }else{
                res.send(err)
            }
    })
})

//Borrar Tramite
router.post('/borrartramite', (req, res) => {

    ModeloTramite.findOneAndDelete({idTramite:req.body.idTramite},(err)=>{
        if(!err){
            res.send('Tramite Borrado correctamente')
        }else{
            res.send(err)
        }
    })
})