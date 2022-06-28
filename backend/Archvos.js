const {readFileSync, promises: fsPromises} = require('fs');
const { arch } = require('os');

function convertir_ingresar(obj){ 
    const fs = require("fs");
    let usersjson = fs.readFileSync("./datos.json","utf-8"); //Leyendo archivo JSON
    let cont = JSON.parse(usersjson); //Parseando a JSON

    json = JSON.parse(convertir(obj.root.inicio,obj.carpetas,obj.archivos))
    //njson=JSON.stringify(njson[0])

    cont.carpetas=json

    usersjson = JSON.stringify(cont);
    fs.writeFileSync("./datos.json",usersjson,"utf-8");
    //var obj = JSON.parse(contents)
    //return obj;
}

function convertir(anterior,carpetas,archivos){
    let tarray=[];
    for(i=0; i<carpetas.length;i++){
        if(carpetas[i].padre==anterior){
            tarray.push({"nombre":carpetas[i].nombre,"id":carpetas[i].id,"size":carpetas[i].size,"fecha":carpetas[i].fecha, "propietario": "", "colaboradores":[] , "contenido":JSON.parse(convertir(carpetas[i].id,carpetas,archivos))})
        }
    }
    for(j=0; j<archivos.length;j++){
        if(archivos[j].padre==anterior){
            tarray.push({"nombre":archivos[j].nombre,"id":archivos[j].id,"size":archivos[j].size,"fecha":archivos[j].fecha, "propietario": "", "colaboradores":[] ,"texto":archivos[j].contenido})
        }
    }
    return JSON.stringify(tarray)
}

function getFile(body){
    const fs = require("fs");
    let usersjson = fs.readFileSync("./datos.json","utf-8"); //Leyendo archivo JSON
    let cont = JSON.parse(usersjson); //Parseando a JSON

    return buscarID(body.id,cont.carpetas)
}

function buscarID(id,archivos){
    var arch=null;
    var ar=null;
    for (let i = 0; i < archivos.length; i++) {
        if(archivos[i].contenido){
            if(id==archivos[i].id){
                return archivos[i]
            }
            ar=buscarID(id,archivos[i].contenido)
            if(ar!=null){
                arch=ar
            }
        }else{
            if(id==archivos[i].id){
                return archivos[i]
            }
        }
    }
    return arch
}

function cambiarProp(body){
    const fs = require("fs");
    let usersjson = fs.readFileSync("./datos.json","utf-8"); //Leyendo archivo JSON
    let cont = JSON.parse(usersjson); //Parseando a JSON
    changeProp(body.id,cont.carpetas,body.propietario,false)

    usersjson = JSON.stringify(cont);
    fs.writeFileSync("./datos.json",usersjson,"utf-8");

    return "shi"
}

function changeProp(id,archivos,propietario,asignar){
    for (let i = 0; i < archivos.length; i++) {
        if(archivos[i].contenido){
            console.log(archivos[i].nombre+" "+asignar)
            if(id==archivos[i].id||asignar==true){
                changeProp(id,archivos[i].contenido,propietario,true)
                archivos[i].propietario=propietario;
                
            }else{
                changeProp(id,archivos[i].contenido,propietario,asignar)
            }
            
        }else{
            console.log(archivos[i].nombre+" "+asignar)
            if(id==archivos[i].id||asignar){
                archivos[i].propietario=propietario;
            }
        }
    }
}

function formatearJSON(obj){ 
    const fs = require("fs");
    js='{'+
        '"usuarios":'+
        '{'+
            '"admin":'+
            '{'+
                '"nombre":"Javier",'+
                '"apellido":"Gutierrez",'+
                '"nusr":"202004765JavierGutierrez",'+
                '"correo":"fubox.admi@gmail.com",'+
                '"telefono":"54338088",'+
                '"pass":"1234",'+
                '"fnac":"14-03-2001",'+
                '"fcre":"23-06-2022"'+
            '},'+
            '"normales":[]'+
        '},'+
        '"carpetas":[]'+
    '}'
    let cont = JSON.parse(js);

    

    usersjson = JSON.stringify(cont);
    fs.writeFileSync("./datos.json",usersjson,"utf-8");

}

function obtenerCarpetas(){
    const fs = require("fs");
    let usersjson = fs.readFileSync("./datos.json","utf-8"); //Leyendo archivo JSON
    let cont = JSON.parse(usersjson);

    return cont.carpetas;
}
module.exports={convertir_ingresar,obtenerCarpetas,formatearJSON,getFile,cambiarProp}