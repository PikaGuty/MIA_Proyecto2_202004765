import { Component, OnInit } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  contenido=""
  constructor(private backend: BackendService, private router: Router) { }

  ngOnInit(): void {
  }
  consulta(){
    alert("Aun soy digno");
  }

  abrir(event:any) {
    const file = event.target.files[0];
   
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      //console.log(fileReader.result);
      if(fileReader.result!=null){
        this.contenido=fileReader.result.toString()
        let obj = JSON.parse(this.contenido);

        let js:any
        this.backend.Cargar(obj).subscribe(
          res=>{
            js = JSON.parse(JSON.stringify(res)) 
            alert(js.Respuesta)
            this.backend.Obtener().subscribe(
              res=>{
                js = JSON.stringify(res)
                this.contenido=js
                console.log(res)
              },
              err=>{
                alert("Ocurrió un error")
              }
            )
          },
          err=>{
            alert("Ocurrió un error")
          }
        )

        console.log(obj)
      }
    }
    fileReader.readAsText(file)   
  }

  /*transformarJSON(inicial:string){
    let obj = JSON.parse(inicial);

    let content: any
    let array = {"nombre":"root","id":obj.root.inicio, "contenido": [content]}
    let idexiste=[obj.root.inicio];
    let posexiste=[array.contenido]

    for (let i = 0; i < obj.carpetas.length; i++) {
      for(let j=0; j<idexiste.length; j++){
        if(obj.carpetas[i].id==idexiste[j]){
          let tarray = {"nombre":obj.carpetas[i].nombre,"id":obj.carpetas[i].id,"size":obj.carpetas[i].size,"fecha":obj.carpetas[i].fecha, "contenido":[content]}
          idexiste.push(obj.carpetas[i].id)
          posexiste[j].push(tarray)
          posexiste.push(posexiste[j].contenido)
          break;
        }
      }
      //console.log(obj.carpetas[i]);
    }
    
    console.log(array)
    
    for (let i = 0; i < obj.archivos.length; i++) {
      //console.log(obj.archivos[i]);
    }
    
    const jsonString = JSON.stringify(array)
  }*/
}


