//
// Created by javierg on 21/06/22.
//

#include "cSyncronice.h"

#include <iostream>
#include <sstream>
#include <cstdlib>
#include "dnc/JSON.hpp"

using JSON = dnc::JSON;

JSON subCarpeta(int inodoAct, superBloque sb, jscarpeta carpetas[512], jsarchivo archivos[512]);

string carpetas(char id[16], char path[512]);

void cSYCRO(char path[512], char id[16]){

    superBloque sb = sb_retornar(id);
    mnt_nodo mountNodo = retornarNodoMount(id); //la particion que tiene los datos

    int n = sb.s_inodes_count; //Total de inodos
        int direccionesInodos[1024];
        obtenerListaBMI(id, direccionesInodos);

        inodo ino;
        ino = inodos_leer1(direccionesInodos[0], n, mountNodo.mnt_ruta, ino);

        carpetas(id,path);


}

string carpetas(char id[16], char path[512]){
    superBloque sb = sb_retornar(id);
    mnt_nodo mountNodo = retornarNodoMount(id); //la particion que tiene los datos

    jscarpeta carpetas[1052];
    jsarchivo archivos[1052];
    for (int i = 0; i < 1052; ++i) {
        carpetas[i].nombre="";
        carpetas[i].id=0;
        carpetas[i].padre=0;
    }

    int n = sb.s_inodes_count; //Total de inodos
    int direccionesInodos[1024];
    obtenerListaBMI(id, direccionesInodos);

    for (int i = 0; i < 1024; ++i) {
        if (direccionesInodos[i]!=0){
            inodo ino;
            ino = inodos_leer1(direccionesInodos[i], n, mountNodo.mnt_ruta, ino);
            if(ino.i_type=='0'){
                for (int j = 0; j < 15; ++j) {
                    if(ino.i_block[j]!=-1){
                        if(j<12){
                            bloqueCarpeta carp;
                            carp = blocksC_leer(ino.i_block[j],n,mountNodo.mnt_ruta,carp);

                            for (int k = 0; k < 4; ++k) {
                                //cout<<"AAAAA "<<carp.b_content[k].b_name<<endl;
                                if(carp.b_content[k].b_inodo!=-1) {
                                    if (strcmp(carp.b_content[k].b_name,".") != 0&&strcmp(carp.b_content[k].b_name,"..") != 0&&strcmp(carp.b_content[k].b_name,"") != 0){
                                        bool salir = false;
                                        //cout<<"SI ENTRA "<<carp.b_content[k].b_name<<endl;
                                        for (int l = 0; l < 1052; ++l) {
                                            if(carpetas[l].id==0){
                                                carpetas[l].nombre=carp.b_content[k].b_name;
                                                carpetas[l].id=carp.b_content[k].b_inodo;
                                                carpetas[l].padre=direccionesInodos[i];
                                                inodo inoo;
                                                inoo = inodos_leer1(carp.b_content[k].b_inodo, n, mountNodo.mnt_ruta, inoo);
                                                carpetas[l].size=inoo.i_size;
                                                strcpy(carpetas[l].fecha,inoo.i_ctime);
                                                if(inoo.i_type=='1'){
                                                    for (int m = 0; m < 1052; ++m) {
                                                        if (archivos[m].id == 0) {
                                                            carpetas[l].id=0;
                                                            archivos[m].nombre=carp.b_content[k].b_name;
                                                            //cout<<"SI ENTRA "<<carp.b_content[k].b_name<<endl;
                                                            archivos[m].id=carp.b_content[k].b_inodo;
                                                            archivos[m].size=inoo.i_size;
                                                            strcpy(archivos[m].fecha,inoo.i_ctime);
                                                            archivos[m].padre=direccionesInodos[i];
                                                            string contenido="";
                                                            for (int i1 = 0; i1 < 15; ++i1) {
                                                                if(inoo.i_block[i1]!=-1){
                                                                    bloqueArchivo arch;
                                                                    arch = blocksA_leer(inoo.i_block[i1], n, mountNodo.mnt_ruta, arch);
                                                                    contenido+=arch.b_content;

                                                                }
                                                            }
                                                            salir = true;
                                                            archivos[m].contenido=contenido;
                                                        }
                                                        if(salir== true){
                                                            break;
                                                        }
                                                    }
                                                }
                                                break;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    string str_json="{";
    str_json+="\t\"root\":{\n";
    str_json+="\t\t\"inicio\":\"";str_json+= to_string(sb.s_inode_start);str_json+="\"\n";
    str_json+="\t},\n";
    str_json+="\t\"carpetas\":[\n";

    bool pcar=true, parch=true;

    for (int i = 0; i < 1052; ++i) {
        if(carpetas[i].id!=0) {
            if(pcar){
                pcar=false;
                str_json+="\t\t{\n";
                str_json+="\t\t\t\"nombre\":\"";str_json+=carpetas[i].nombre;str_json+="\",\n";
                str_json+="\t\t\t\"id\":\"";str_json+= to_string(carpetas[i].id);str_json+="\",\n";
                str_json+="\t\t\t\"padre\":\"";str_json+= to_string(carpetas[i].padre);str_json+="\",\n";
                str_json+="\t\t\t\"size\":\"";str_json+= to_string(carpetas[i].size);str_json+="\",\n";
                str_json+="\t\t\t\"fecha\":\"";str_json+= carpetas[i].fecha;str_json+="\"\n";
                str_json+="\t\t}";
            }else{
                str_json+=",\n\t\t{\n";
                str_json+="\t\t\t\"nombre\":\"";str_json+=carpetas[i].nombre;str_json+="\",\n";
                str_json+="\t\t\t\"id\":\"";str_json+= to_string(carpetas[i].id);str_json+="\",\n";
                str_json+="\t\t\t\"padre\":\"";str_json+= to_string(carpetas[i].padre);str_json+="\",\n";
                str_json+="\t\t\t\"size\":\"";str_json+= to_string(carpetas[i].size);str_json+="\",\n";
                str_json+="\t\t\t\"fecha\":\"";str_json+= carpetas[i].fecha;str_json+="\"\n";
                str_json+="\t\t}";
            }
            /*cout<<"*****"<<endl;
            cout << "Nombre: " << carpetas[i].nombre << endl;
            cout << "ID: " << carpetas[i].id << endl;
            cout << "Padre: " << carpetas[i].padre << endl;
            cout<<"*****"<<endl;*/
        }
    }
    str_json+="\n\t],\n";
    str_json+="\t\"archivos\":[\n";

    for (int i = 0; i < 1052; ++i) {
        if(archivos[i].id!=0) {
            if(parch){
                parch=false;
                str_json+="\t\t{\n";
                str_json+="\t\t\t\"nombre\":\"";str_json+=archivos[i].nombre;str_json+="\",\n";
                str_json+="\t\t\t\"id\":\"";str_json+= to_string(archivos[i].id);str_json+="\",\n";
                str_json+="\t\t\t\"padre\":\"";str_json+= to_string(archivos[i].padre);str_json+="\",\n";
                str_json+="\t\t\t\"size\":\"";str_json+= to_string(archivos[i].size);str_json+="\",\n";
                str_json+="\t\t\t\"fecha\":\"";str_json+= archivos[i].fecha;str_json+="\",\n";
                str_json+="\t\t\t\"contenido\":\"";str_json+= archivos[i].contenido;str_json+="\"\n";
                str_json+="\t\t}";
            }else{
                str_json+=",\n\t\t{\n";
                str_json+="\t\t\t\"nombre\":\"";str_json+=archivos[i].nombre;str_json+="\",\n";
                str_json+="\t\t\t\"id\":\"";str_json+= to_string(archivos[i].id);str_json+="\",\n";
                str_json+="\t\t\t\"padre\":\"";str_json+= to_string(archivos[i].padre);str_json+="\",\n";
                str_json+="\t\t\t\"size\":\"";str_json+= to_string(archivos[i].size);str_json+="\",\n";
                str_json+="\t\t\t\"fecha\":\"";str_json+= archivos[i].fecha;str_json+="\",\n";
                str_json+="\t\t\t\"contenido\":\"";str_json+= archivos[i].contenido;str_json+="\"\n";
                str_json+="\t\t}";
            }
            /*cout<<"*****"<<endl;
            cout << "Nombre: " << archivos[i].nombre << endl;
            cout << "ID: " << archivos[i].id << endl;
            cout << "Padre: " << archivos[i].padre << endl;
            cout << "Contenido: " << archivos[i].contenido << endl;
            cout<<"*****"<<endl;*/
        }
    }
    str_json+="\n\t]\n";
    str_json+="}";

    JSON json;
    json.parse(str_json);


    /*JSON contenidoCarpeta({
        {"id",to_string(sb.s_inode_start)},
        {"nombre","root"},
        {"contenido",JSON::Array({
            subCarpeta(sb.s_inode_start,sb,carpetas,archivos)
        })}
    });

    JSON obj({
        {"carpeta", JSON::Array({
            contenidoCarpeta
        })}
    });*/

    if(json.saveToFile(path)){
        cout << "¡Archivo guardado exitosamente!" << endl;
    }else{
        cout << "No se ha podido guardar el archivo." << endl;
    }
}

JSON subCarpeta(int inodoAct,superBloque sb,jscarpeta carpetas[1052], jsarchivo archivos[1052]){

    JSON contenidoC[64], contenidoA[64];
    JSON empty;
    int cantidadC=0, cantidadA=0;
    for (int i = 0; i < 1052; ++i) {
        if(archivos[i].id!=0) {
            for (int j = 0; j < 1052; ++j) {
                if (archivos[j].id != 0) {
                    if (archivos[j].padre==inodoAct) {
                        int iddd = archivos[j].id;
                        archivos[j].id=0;
                        JSON contenidoArchivo({
                                {"id", to_string(iddd)},
                                {"nombre",archivos[j].nombre},
                                {"contenido",archivos[j].contenido}
                        });
                        contenidoA[cantidadA]=contenidoArchivo;
                        cantidadA++;
                    }
                }
            }

            if (carpetas[i].padre==inodoAct) {
                int idd = carpetas[i].id;
                carpetas[i].id=0;
                JSON contenidoCarpeta({
                        {"id", to_string(idd)},
                        {"nombre",carpetas[i].nombre},
                        {"contenido",JSON::Array({
                        subCarpeta(idd,sb,carpetas,archivos)
                    })}
                });
                contenidoC[cantidadC]=contenidoCarpeta;
                cantidadC++;
            }

        }
    }



    JSON obj({
        {"carpeta", JSON::Array({
            contenidoC[0],contenidoC[1],contenidoC[2],contenidoC[3],contenidoC[4],
            contenidoC[5],contenidoC[6],contenidoC[7],contenidoC[8],contenidoC[9],
        })},
        {"archivo", JSON::Array({
            contenidoA[0],contenidoA[1],contenidoA[2],contenidoA[3],contenidoA[4],
            contenidoA[5],contenidoA[6],contenidoA[7],contenidoA[8],contenidoA[9]
        })}
    });

    return obj;
}

