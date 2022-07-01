const {readFileSync, promises: fsPromises} = require('fs');
const { arch } = require('os');
var usuarios = require('./LogUsuarios');


function convertir_ingresar(obj){ 
    const fs = require("fs");
    let usersjson = fs.readFileSync("./datos.json","utf-8"); //Leyendo archivo JSON
    let cont = JSON.parse(usersjson); //Parseando a JSON

    json = JSON.parse(convertir(obj.root.inicio,obj.carpetas,obj.archivos,0))
    //njson=JSON.stringify(njson[0])

    cont.carpetas=[{"nombre":"/","id":"0","size":"0","fecha":"", "propietario": "", "colaboradores":[] , "contenido":json}]

    usersjson = JSON.stringify(cont);
    fs.writeFileSync("./datos.json",usersjson,"utf-8");
    //var obj = JSON.parse(contents)
    //return obj;
}

function convertir(anterior,carpetas,archivos,nu){
    let tarray=[];
    let quedo=0;
    for(i=0; i<carpetas.length;i++){
        if(nu==0){
            
        }
        if(carpetas[i].padre==anterior){
            quedo=i;
            tarray.push({"nombre":carpetas[i].nombre,"id":carpetas[i].id,"size":carpetas[i].size,"fecha":carpetas[i].fecha, "propietario": "", "colaboradores":[] , "contenido":JSON.parse(convertir(carpetas[i].id,carpetas,archivos,nu+1))})
            
            i=quedo;
        }
    }
    for(j=0; j<archivos.length;j++){
                if(archivos[j].padre==anterior){
                    tarray.push({"nombre":archivos[j].nombre,"id":archivos[j].id,"size":archivos[j].size,"fecha":archivos[j].fecha, "propietario": "", "colaboradores":[] ,"texto":archivos[j].contenido})
                }
            }
    
    console.log("Regresa")
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

function nuevoArchCarp(body){
    const fs = require("fs");
    let usersjson = fs.readFileSync("./datos.json","utf-8"); //Leyendo archivo JSON
    let cont = JSON.parse(usersjson); //Parseando a JSON
    
    res = bNuevoID(body.id,cont.carpetas,body.js)

    usersjson = JSON.stringify(cont);
    fs.writeFileSync("./datos.json",usersjson,"utf-8");

    return res
}

function bNuevoID(id,archivos,js){
    var arch=null;
    var ar=null;
    for (let i = 0; i < archivos.length; i++) {
        //console.log(archivos[i])
        if(archivos[i].contenido){
            if(id==archivos[i].id){
                js.id=archivos[i].id+archivos[i].contenido.length
                js.propietario = archivos[i].propietario
                js.colaboradores = archivos[i].colaboradores
                archivos[i].contenido.push(js);
                return archivos[i]
            }
            ar=bNuevoID(id,archivos[i].contenido,js)
            if(ar!=null){
                arch=ar
            }
        }
    }
    return arch
}

function eliminArchCarp(body){
    const fs = require("fs");
    let usersjson = fs.readFileSync("./datos.json","utf-8"); //Leyendo archivo JSON
    let cont = JSON.parse(usersjson); //Parseando a JSON
    
    res = bEliminaID(body.id,cont.carpetas)

    usersjson = JSON.stringify(cont);
    fs.writeFileSync("./datos.json",usersjson,"utf-8");
    return res
}

function bEliminaID(id,archivos){
    var arch=null;
    var ar=null;
    for (let i = 0; i < archivos.length; i++) {
        if(archivos[i].contenido){
            console.log(id+"="+archivos[i].id)
            if(id==archivos[i].id){
                archivos.splice(i, 1);
                return "Hecho"
            }
            ar=bEliminaID(id,archivos[i].contenido)
            if(ar!=null){
                arch=ar
            }
        }else{
            if(id==archivos[i].id){
                archivos.splice(i, 1);
                return "hecho"
            }
        }
    }
    return arch
}

function modCarp(body){
    const fs = require("fs");
    let usersjson = fs.readFileSync("./datos.json","utf-8"); //Leyendo archivo JSON
    let cont = JSON.parse(usersjson); //Parseando a JSON
    
    res = bModID(body.id,cont.carpetas,body.nombre)

    usersjson = JSON.stringify(cont);
    fs.writeFileSync("./datos.json",usersjson,"utf-8");
    if(res!=null){
        const dia = new Date();
        dia.getDate();
        contenidoCorreo="Se ha modificado el nombre de tu carpeta a "+body.nombre;
        
        usuarios.enviarCorreo(retornarCorreo(res),"FuBox - Modificación", contenidoCorreo);
    }
    return res
}

function bModID(id,archivos,nombre){
    var arch=null;
    var ar=null;
    for (let i = 0; i < archivos.length; i++) {
        if(archivos[i].contenido){
            console.log(id+"="+archivos[i].id)
            if(id==archivos[i].id){
                archivos[i].nombre=nombre;
                return archivos[i].propietario
            }
            ar=bModID(id,archivos[i].contenido,nombre)
            if(ar!=null){
                arch=ar
            }
        }
    }
    return arch
}

function modArch(body){
    const fs = require("fs");
    let usersjson = fs.readFileSync("./datos.json","utf-8"); //Leyendo archivo JSON
    let cont = JSON.parse(usersjson); //Parseando a JSON
    
    res = bModArID(body.id,cont.carpetas,body.nombre,body.texto)

    usersjson = JSON.stringify(cont);
    fs.writeFileSync("./datos.json",usersjson,"utf-8");
    if(res!=null){
        const dia = new Date();
        dia.getDate();
        contenidoCorreo="Se ha modificado el archivo "+body.nombre;
        usuarios.enviarCorreo(retornarCorreo(res),"FuBox - Modificación", contenidoCorreo);
    }
    return res
}

function bModArID(id,archivos,nombre,texto){
    var arch=null;
    var ar=null;
    for (let i = 0; i < archivos.length; i++) {
        if(archivos[i].contenido){
            ar=bModArID(id,archivos[i].contenido,nombre,texto)
            if(ar!=null){
                arch=ar
            }
        }else{
            if(id==archivos[i].id){
                archivos[i].nombre=nombre;
                archivos[i].texto=texto;
                return archivos[i].propietario
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

function obtenerDU(body){
    const fs = require("fs");
    let usersjson = fs.readFileSync("./datos.json","utf-8"); //Leyendo archivo JSON
    let cont = JSON.parse(usersjson);
    let propiedades = []

    buscarUser(body.propietario,cont.carpetas,propiedades)

    return propiedades
}

function buscarUser(usr,archivos,propiedades){
    var arch=null;
    var ar=null;
    for (let i = 0; i < archivos.length; i++) {
        console.log(usr+" = "+archivos[i].propietario)
        if(archivos[i].contenido){
            console.log(archivos[i].nombre)
            if(usr==archivos[i].propietario){
                return archivos[i]
            }
            ar=buscarUser(usr,archivos[i].contenido,propiedades)
            if(ar!=null){
                propiedades.push(ar)
            }
        }else{
            if(usr==archivos[i].propietario){
                return archivos[i]
            }
        }
    }
    return arch
}

function retornarCorreo(user){
    const fs = require("fs");
    let usersjson = fs.readFileSync("./datos.json","utf-8"); //Leyendo archivo JSON
    let cont = JSON.parse(usersjson); //Parseando a JSON

    var usrs = cont.usuarios; //accediendo a elemento usuarios

    var usuarios=[]
    for (let i = 0; i < usrs.normales.length; i++) {
        if(usrs.normales[i].status =="1"){
            if(usrs.normales[i].nusr == user){
                return usrs.normales[i].correo
            }
        }
    }
    return null;
}

module.exports={convertir_ingresar,obtenerCarpetas,formatearJSON,getFile,cambiarProp,obtenerDU,nuevoArchCarp,eliminArchCarp, modCarp, modArch}