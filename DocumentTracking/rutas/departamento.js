const express = require ('express')
const router = express.Router()

const mongoose = require('mongoose')
const { model } = require('../conexion')
const eschema  = mongoose.Schema

const eschemadepartamento = new eschema({
    idDepartamento: {type: String ,required: true, unique: true},
  //  idEmpresa: {type: String ,required: true},
    idJefe:{type: String },
    nombre: {type: String ,required: true},
    descripcion: String,
    estado: {type: String , enum: ['A', 'I'] , default : 'A' ,required: true},
    telefono: Number,
    correo: String,
    empleados: [String],
    tramites:[String]
})

const ModeloDepartamento = mongoose.model('departamentos', eschemadepartamento)
module.exports = router

// //Agregar Departamento
router.post('/agregardepartamento', (req, res) => {

    const nuevousuario = new ModeloDepartamento({
        idDepartamento: req.body.idDepartamento,
       // idEmpresa: req.body.idEmpresa,
        idJefe: req.body.idJefe,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        estado: req.body.estado,
        telefono: req.body.telefono,
        correo: req.body.correo,
        empleados: req.body.empleados,
        tramites: req.body.tramites
    })

    console.log('Informacion del Body');
    //console.log(req.body)

    nuevousuario.save(function(err){
        if(!err){ 
            res.send('Departamento agregado correctamente')
        }else{
            res.send(err)
        }
    })
})

// // obtener todos los departamentos
// router.get('/obtenerdepartamentos', (req, res) =>{
//     ModeloDepartamento.find({}, function (docs , err){
//         if(!err){
//             res.send(docs)
//         }else{
//             res.send(err)
//         }
//     })
// } )

// obtener todos los departamentos
router.post('/obtenerdepartamentos', (req, res) =>{
    ModeloDepartamento.find({estado : req.body.estado}, function (docs , err){
        if(!err){
            res.send(docs)
        }else{
            res.send(err)
        }
    })
} )

// obtener data de departamento
router.post('/obtenerdatadepartamento', (req, res) =>{
    ModeloDepartamento.find({idDepartamento:req.body.idDepartamento}, function (docs , err){
        if(!err){
            res.send(docs)
        }else{
            res.send(err)
        }
    })
} )


//Actualiza Departamento
router.post('/actualizardepartamento', (req, res) => {

    ModeloDepartamento.findOneAndUpdate({idDepartamento:req.body.idDepartamento},{
        idDepartamento: req.body.idDepartamento,
      //  idEmpresa: req.body.idEmpresa,
        idJefe: req.body.idJefe,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        estado: req.body.estado,
        telefono: req.body.telefono,
        correo: req.body.correo,
        empleados: req.body.empleados,
        tramites: req.body.tramites
    }, (err)=>{
            if(!err){
                res.send('Departamento actualizado correctamente')
            }else{
                res.send(err)
            }
    })
})


//Borrar Departamento
router.post('/borrardepartamento', (req, res) => {

    ModeloDepartamento.findOneAndDelete({idDepartamento:req.body.idDepartamento},(err)=>{
        if(!err){
            res.send('Departamento borrado correctamente')
        }else{
            res.send(err)
        }
    })
})
