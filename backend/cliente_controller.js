
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

exports.reportarUsuario = async(req, res)=>{
    res.json({Respuesta:usuarios.reportarUsuario(req.body)})
}

exports.eliminarUsuario = async(req, res)=>{
    res.json({Respuesta:usuarios.eliminarUsuario(req.body)})
}

exports.convertirIngresar = async(req,res)=>{
    archivs.convertir_ingresar(req.body)
    res.json({Respuesta:"Sistema de archivos sincronizado"})
}

exports.obtenerCarpetas = async(req,res)=>{
    res.json(archivs.obtenerCarpetas())
}

exports.obtenerUsuarios = async(req,res)=>{
    res.json(usuarios.retornarUsuarios(req.body))
}

exports.obtenerUsuariosH = async(req,res)=>{
    res.json(usuarios.retornarUsuariosH())
}

exports.formatearJSON = async(req,res)=>{
    archivs.formatearJSON()
    res.json({Respuesta:"Se ha formateado el archivo JSON"})
}

exports.getFile = async(req,res)=>{
    res.json(archivs.getFile(req.body))
}

exports.cambiarProp = async(req,res)=>{
    archivs.cambiarProp(req.body)
    res.json({Respuesta:"Si"})
}

exports.obtenerDU = async(req,res)=>{
    res.json(archivs.obtenerDU(req.body))
}

exports.datosUsuario = async(req,res)=>{
    res.json(usuarios.datosUsuario(req.body))
}

exports.modificarUsuario = async(req,res)=>{
    res.json({Respuesta:usuarios.modificarUsuario(req.body)})
}

exports.nuevoArchCarp = async(req,res)=>{
    res.json({Respuesta:archivs.nuevoArchCarp(req.body)})
}

exports.eliminArchCarp = async(req,res)=>{
    res.json({Respuesta:archivs.eliminArchCarp(req.body)})
}

exports.modCarp = async(req,res)=>{
    res.json({Respuesta:archivs.modCarp(req.body)})
}

exports.modArch = async(req,res)=>{
    res.json({Respuesta:archivs.modArch(req.body)})
}

exports.compartirF= async(req,res)=>{
    res.json({Respuesta:archivs.compartirF(req.body)})
}

exports.obtenerColab= async(req,res)=>{
    res.json({Respuesta:archivs.obtenerColab(req.body)})
}


exports.terminarArchCarp= async(req,res)=>{
    res.json({Respuesta:archivs.terminarArchCarp(req.body)})
}