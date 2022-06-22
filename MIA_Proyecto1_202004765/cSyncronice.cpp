//
// Created by javierg on 21/06/22.
//

#include "cSyncronice.h"

string carpetas(char id[16]);

void cSYCRO(char path[512], char id[16]){

    superBloque sb = sb_retornar(id);
    mnt_nodo mountNodo = retornarNodoMount(id); //la particion que tiene los datos

    int n = sb.s_inodes_count; //Total de inodos
    int direccionesInodos[1024];
    obtenerListaBMI(id, direccionesInodos);

    inodo ino;
    ino = inodos_leer1(direccionesInodos[0], n, mountNodo.mnt_ruta, ino);

    carpetas(id);
}

string carpetas(char id[16]){
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
                                if(carp.b_content[k].b_inodo!=-1) {
                                    if (strcmp(carp.b_content[k].b_name,".") != 0&&strcmp(carp.b_content[k].b_name,"..") != 0&&strcmp(carp.b_content[k].b_name,"") != 0){
                                        bool salir = false;
                                        for (int l = 0; l < 1052; ++l) {
                                            if(carpetas[l].id==0){
                                                carpetas[l].nombre=carp.b_content[k].b_name;
                                                carpetas[l].id=carp.b_content[k].b_inodo;
                                                carpetas[l].padre=direccionesInodos[i];

                                                inodo inoo;
                                                inoo = inodos_leer1(carp.b_content[k].b_inodo, n, mountNodo.mnt_ruta, inoo);
                                                if(inoo.i_type=='1'){
                                                    cout<<"ES ARCHIVO"<<endl;
                                                    for (int m = 0; m < 1052; ++m) {
                                                        if (archivos[m].id == 0) {
                                                            carpetas[l].id=0;
                                                            archivos[m].nombre=carp.b_content[k].b_name;
                                                            archivos[m].id=carp.b_content[k].b_inodo;
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

    for (int i = 0; i < 1052; ++i) {
        if(carpetas[i].id!=0) {
            cout<<"*****"<<endl;
            cout << "Nombre: " << carpetas[i].nombre << endl;
            cout << "ID: " << carpetas[i].id << endl;
            cout << "Padre: " << carpetas[i].padre << endl;
            cout<<"*****"<<endl;
        }
    }

    for (int i = 0; i < 1052; ++i) {
        if(archivos[i].id!=0) {
            cout<<"*****"<<endl;
            cout << "Nombre: " << archivos[i].nombre << endl;
            cout << "ID: " << archivos[i].id << endl;
            cout << "Padre: " << archivos[i].padre << endl;
            cout << "Contenido: " << archivos[i].contenido << endl;
            cout<<"*****"<<endl;
        }
    }

    string json = "";


    inodo inoo;
    inoo = inodos_leer1(sb.s_first_ino, n, mountNodo.mnt_ruta, inoo);

    json = "{\n"
           "\"carpeta\":{\n"
           "\t\"id_carpeta\": ";
    json+= to_string(sb.s_first_ino);
    json+="\n"
           "\t\"name_carpeta\": \"root\",\n"
           "\t\"ctime_carpeta\": \"";
    json+= inoo.i_ctime;
    json+="\",\n"
          "\t\"contenido_carpeta\": {\n";

    json+="";


    json += "\t}\n";
    json += "}\n";
    json += "}";

    cout<<json<<endl;

}