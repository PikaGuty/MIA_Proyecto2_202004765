
var usuarios = require('./LogUsuarios');
var archivs = require('./Archvos')
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

exports.eliminarU = async(req, res)=>{
    res.json({Respuesta:usuarios.eliminarUsuario(req.body)})
}

exports.convertirIngresar = async(req,res)=>{
    archivs.convertir_ingresar(req.body)
    res.json({Respuesta:"Sistema de archivos sincronizado"})
}

exports.obtenerCarpetas = async(req,res)=>{
    res.json(archivs.obtenerCarpetas())
}