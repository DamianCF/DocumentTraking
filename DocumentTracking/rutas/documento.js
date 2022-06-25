const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const { model } = require('../conexion')
const eschema = mongoose.Schema

const eschemadocumento = new eschema({
    idDocumento: String, //{type: String ,required: true, unique : true},
    detalles: String,
    ubicacion: String,
    estado: { type: String, enum: ['A', 'I'], default: 'A', required: true }
})

const ModeloDocumento = mongoose.model('documentos', eschemadocumento)
module.exports = router

//Agregar Documento  HAY UN ERROR RARO
router.post('/agregardocumento', (req, res) => {

    const nuevodocumento = new ModeloDocumento({
        idDocumento: req.body.idDocumento,
        detalles: req.body.detalles,
        ubicacion: req.body.ubicacion,
        estado: req.body.estado
    })

    console.log('Informacion del Body');
    console.log(req.body)

    nuevodocumento.save(function (err) {
        if (!err) {
            res.send('Documento agregado correctamente')
        } else {
            console.log(err)
            res.send(err)
        }
    })
})

// obtener todos los docuentos
router.get('/obtenerdocumentos', (req, res) => {
    ModeloDocumento.find({}, function (docs, err) {
        if (!err) {
            res.send(docs)
        } else {
            res.send(err)
        }
    })
})

// obtener data de documento
router.post('/obtenerdatadocumento', (req, res) =>{
    ModeloDocumento.find({idDocumento:req.body.idDocumento}, function (docs , err){
        if(!err){
            res.send(docs)
        }else{
            res.send(err)
        }
    })
} )


//Actualiza documento
router.post('/actualizadocumento', (req, res) => {

    ModeloDocumento.findOneAndUpdate({idDocumento:req.body.idDocumento},{
        idDocumento: req.body.idDocumento,
        detalles: req.body.detalles,
        ubicacion: req.body.ubicacion,
        estado: req.body.estado

    }, (err)=>{
            if(!err){
                res.send('Documento actualizado correctamente')
            }else{
                res.send(err)
            }
    })
})


//Borrar Documento
router.post('/borrardocumento', (req, res) => {

    ModeloDocumento.findOneAndDelete({idDocumento:req.body.idDocumento},(err)=>{
        if(!err){
            res.send('Documento borrado correctamente')
        }else{
            res.send(err)
        }
    })
})
// comentario