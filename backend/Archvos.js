const {readFileSync, promises: fsPromises} = require('fs');

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
            tarray.push({"nombre":carpetas[i].nombre,"id":carpetas[i].id,"size":carpetas[i].size,"fecha":carpetas[i].fecha, "contenido":JSON.parse(convertir(carpetas[i].id,carpetas,archivos))})
        }
    }
    for(j=0; j<archivos.length;j++){
        if(archivos[j].padre==anterior){
            tarray.push({"nombre":archivos[j].nombre,"id":archivos[j].id,"size":archivos[j].size,"fecha":archivos[j].fecha, "texto":archivos[j].contenido})
        }
    }
    return JSON.stringify(tarray)
}

function obtenerCarpetas(){
    const fs = require("fs");
    let usersjson = fs.readFileSync("./datos.json","utf-8"); //Leyendo archivo JSON
    let cont = JSON.parse(usersjson);

    return cont.carpetas;
}
module.exports={convertir_ingresar,obtenerCarpetas}