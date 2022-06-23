const {readFileSync, promises: fsPromises} = require('fs');

function obtener(){
    const contents = readFileSync("./datos.json", 'utf-8');
    
    var obj = JSON.parse(contents)
    return obj;
}

function syncReadFile(filename) {
    
}

function ingresarUsuario(datos){
    const fs = require("fs");
    let usersjson = fs.readFileSync("./datos.json","utf-8");
    let cont = JSON.parse(usersjson);
    
    var usrs = cont.usuarios;
    usrs.normales.push(datos);
    
    usersjson = JSON.stringify(cont);
    fs.writeFileSync("./datos.json",usersjson,"utf-8");
}

module.exports={obtener, ingresarUsuario}