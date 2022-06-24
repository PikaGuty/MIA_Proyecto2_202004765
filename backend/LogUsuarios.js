const {readFileSync, promises: fsPromises} = require('fs');

function obtener(){ //Obtener todos los datos almancenados
    const contents = readFileSync("./datos.json", 'utf-8');
    
    var obj = JSON.parse(contents)
    return obj;
}

function ingresarUsuario(datos){ //Ingresar JSON de nuevo usuario
    if(!comprobar(datos.nusr)){
        const fs = require("fs");
        let usersjson = fs.readFileSync("./datos.json","utf-8");
        let cont = JSON.parse(usersjson);
        
        var usrs = cont.usuarios;
        usrs.normales.push(datos);
        
        usersjson = JSON.stringify(cont);
        fs.writeFileSync("./datos.json",usersjson,"utf-8");

        const dia = new Date();
        dia.getDate();

        contenidoCorreo="Bienvenido a FuBox, se ha registrado exitosamente el "+dia+", espera a que un administrador habilite tu cuenta para poder disfrutar de la experiencia de FuBox. :)";
        enviarCorreo(datos.correo,"FuBox - Registro exitoso", contenidoCorreo);
        return "Agregado Exitosamente"
    }else{
        return "El usuario "+datos.nusr+" ya existe"
    }
    
}

function comprobar(usuario){
    const fs = require("fs");
    let usersjson = fs.readFileSync("./datos.json","utf-8"); //Leyendo archivo JSON
    let cont = JSON.parse(usersjson); //Parseando a JSON

    var usrs = cont.usuarios; //accediendo a elemento usuarios

    for (let i = 0; i < usrs.normales.length; i++) {
        if(usrs.normales[i].nusr==usuario){
            return true;
        }
    }
    return false;
}

function aceptarUsuario(usuario){
    const fs = require("fs");
    let usersjson = fs.readFileSync("./datos.json","utf-8"); //Leyendo archivo JSON
    let cont = JSON.parse(usersjson); //Parseando a JSON

    var usrs = cont.usuarios; //accediendo a elemento usuarios

    for (let i = 0; i < usrs.normales.length; i++) {
        if(usrs.normales[i].nusr==usuario.nusr){
            
            usrs.normales[i].status="1"
            
            usersjson = JSON.stringify(cont);
            fs.writeFileSync("./datos.json",usersjson,"utf-8");
            const dia = new Date();
            dia.getDate();
            contenidoCorreo="Bienvenido a FuBox, se ha habilitado tu cuenta el "+dia+", disfruta de la experiencia de FuBox. :)";
            enviarCorreo(usrs.normales[i].correo,"FuBox - Cuenta habilitada", contenidoCorreo);
            return "Aceptado"
        }
    }
    return "No se encontró"
}

function reportarUsuario(usuario){
    const fs = require("fs");
    let usersjson = fs.readFileSync("./datos.json","utf-8"); //Leyendo archivo JSON
    let cont = JSON.parse(usersjson); //Parseando a JSON

    var usrs = cont.usuarios; //accediendo a elemento usuarios

    for (let i = 0; i < usrs.normales.length; i++) {
        if(usrs.normales[i].nusr==usuario.nusr){
            
            usrs.normales[i].status="3"
            usersjson = JSON.stringify(cont);
            fs.writeFileSync("./datos.json",usersjson,"utf-8");
            
            return "Reportado"
        }
    }
    return "No se encontró"
}

function eliminarUsuario(usuario){
    const fs = require("fs");
    let usersjson = fs.readFileSync("./datos.json","utf-8"); //Leyendo archivo JSON
    let cont = JSON.parse(usersjson); //Parseando a JSON

    var usrs = cont.usuarios; //accediendo a elemento usuarios

    for (let i = 0; i < usrs.normales.length; i++) {
        if(usrs.normales[i].nusr==usuario.nusr){
            correo=usrs.normales[i].correo;
            
            delete usrs.normales[i];
            usersjson = JSON.stringify(cont);
            fs.writeFileSync("./datos.json",usersjson,"utf-8");
            
            contenidoCorreo="Lo sentimos, hemos dado de baja tu cuenta ya que se han presentado reportes de varios usuarios";
            enviarCorreo(correo,"FuBox - Banneado", contenidoCorreo);
            return "Eliminado"
        }
    }
    return "No se encontró"
}

function login(datos){
    const fs = require("fs");
    let usersjson = fs.readFileSync("./datos.json","utf-8"); //Leyendo archivo JSON
    let cont = JSON.parse(usersjson); //Parseando a JSON

    var usrs = cont.usuarios; //accediendo a elemento usuarios

    if(usrs.admin.nusr==datos.nusr&&usrs.admin.pass==datos.pass){
        return "admin"
    }else{
        for (let i = 0; i < usrs.normales.length; i++) {
            if(usrs.normales[i].nusr==datos.nusr&&usrs.normales[i].pass==datos.pass){
                if(usrs.normales[i].status=='0'){
                    return "habilitar"
                }else if(usrs.normales[i].status=='2'){
                    return "recuperar "
                }else{
                    return "usuario bien"
                }
                
            }
        }
        return "no existe"
    }
}

function enviarCorreo(correo, asunto, contenido){
    var nodemailer = require('nodemailer');

    //Creamos el objeto de transporte
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'fubox.admi@gmail.com',
        pass: ''
      }
    });

    var mailOptions = {
        from: 'fubox.admi@gmail.com',
        to: correo,
        subject: asunto,
        text: contenido
    };

    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email enviado: ' + info.response);
    }
    });
}

module.exports={obtener, ingresarUsuario, login, aceptarUsuario, reportarUsuario, eliminarUsuario}