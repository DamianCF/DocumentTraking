const mongoose = require('mongoose');
//mongoose.connect('mongodb://127.0.0.1:27017/DocumentTraking');
mongoose.connect('mongodb+srv://sys:sys@proyectop4.krrl4ld.mongodb.net/DocumentTracking?retryWrites=true&w=majority')

const objetobd = mongoose.connection

objetobd.on('connected', ()=>{console.log('Conexion correcta a MongoDB')})
objetobd.on('error', ()=>{console.log('Error en la conexion a MongoDB')})

module.exports = mongoose
