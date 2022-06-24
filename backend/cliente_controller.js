
var usuarios = require('./LogUsuarios');
const { stderr } = require('process');


exports.index = async(req, res)=>{
    res.send(usuarios.obtener())
}

exports.ingresarU = async(req, res)=>{ //Registrar usuario
    res.json({Respuesta:usuarios.ingresarUsuario(req.body)})
}

exports.login = async(req, res)=>{
    res.json({Respuesta:usuarios.login(req.body)})
}

exports.habilitar = async(req, res)=>{
    res.json({Respuesta:usuarios.aceptarUsuario(req.body)})
}

exports.reportar = async(req, res)=>{
    res.json({Respuesta:usuarios.reportarUsuario(req.body)})
}

exports.eliminarU = async(req, res)=>{
    res.json({Respuesta:usuarios.eliminarUsuario(req.body)})
}