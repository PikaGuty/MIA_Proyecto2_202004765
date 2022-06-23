
var usuarios = require('./LogUsuarios');
const { stderr } = require('process');


exports.index = async(req, res)=>{
    res.send(usuarios.obtener())
}

exports.ingresarU = async(req, res)=>{
    usuarios.ingresarUsuario(req.body)
    res.json({Respuesta:"si"})
}