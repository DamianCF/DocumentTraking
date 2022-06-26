const express = require ('express')
const router = express.Router()

const mongoose = require('mongoose')
const { model } = require('../conexion')
const eschema  = mongoose.Schema

const eschemaempleado = new eschema({
    idEmpleado: {type: String ,required: true , unique: true},
   // idEmpresa: {type: String ,required: true},
    nombre:{type: String ,required: true},
    pApellido:{type: String ,required: true},
    sApellido:String,
    cedula:{type: Number ,required: true , unique: true},
    edad: Number,
    sexo: String,
    desc_labor: String,
    rol: String,
    telefono: Number,
    correo: String,
    clave: String,
    estado: {type: String , enum: ['A', 'I'] , default : 'A' ,required: true}
})

const ModeloEmpleado = mongoose.model('empleados', eschemaempleado)
module.exports = router

//Agregar Empleado
router.post('/agregarempleado', (req, res) => {

    const nuevoempleado = new ModeloEmpleado({
        idEmpleado: req.body.idEmpleado,
        //idEmpresa: req.body.idEmpresa,
        nombre: req.body.nombre,
        pApellido: req.body.pApellido,
        sApellido: req.body.sApellido,
        cedula: req.body.cedula,
        edad: req.body.edad,
        sexo: req.body.sexo,
        desc_labor: req.body.desc_labor,
        rol: req.body.rol,
        telefono: req .body.telefono,
        correo: req.body.correo,
        estado: req.body.estado,
        clave: req.body.clave
    })

    console.log('Informacion del Body Empleado');
    console.log(req.body)

    nuevoempleado.save(function(err){
        if(!err){ 
            res.send('Empleado agregado correctamente')
        }else{
            res.send(err)
        }
    })
})

// obtener todos los empleados
router.get('/obtenerempleados', (req, res) =>{
    ModeloEmpleado.find({}, function (docs , err){
        if(!err){
            res.send(docs)
        }else{
            res.send(err)
        }
    })
} )

// obtener data de empleado
router.post('/obtenerdataempleado', (req, res) =>{
    ModeloEmpleado.find({idEmpleado:req.body.idEmpleado}, function (docs , err){
        if(!err){
            res.send(docs)
        }else{
            res.send(err)
        }
    })
} )



// obtener data de empleado LOGIN
router.post('/obtenerdataempleadologin', (req, res) =>{
    ModeloEmpleado.find({cedula:req.body.cedula, clave:req.body.clave}, function (docs , err){
        if(!err){
            res.send(docs)
        }else{
            res.send(err)
        }
    })
} )


//Actualiza empleado
router.post('/actualizarempleado', (req, res) => {

    ModeloEmpleado.findOneAndUpdate({idEmpleado:req.body.idEmpleado},{
        idEmpleado: req.body.idEmpleado,
       // idEmpresa: req.body.idEmpresa,
        nombre: req.body.nombre,
        pApellido: req.body.pApellido,
        sApellido: req.body.sApellido,
        cedula: req.body.cedula,
        edad: req.body.edad,
        sexo: req.body.sexo,
        desc_labor: req.body.desc_labor,
        rol: req.body.rol,
        telefono: req .body.telefono,
        correo: req.body.correo,
        estado: req.body.estado,
        clave: req.body.clave

    }, (err)=>{
            if(!err){
                res.send('Empleado actualizado correctamente')
            }else{
                res.send(err)
            }
    })
})


//Borrar Enpleado
router.post('/borrarempleado', (req, res) => {

    ModeloEmpleado.findOneAndDelete({idEmpleado:req.body.idEmpleado},(err)=>{
        if(!err){
            res.send('Empleado borrado correctamente')
        }else{
            res.send(err)
        }
    })
})
