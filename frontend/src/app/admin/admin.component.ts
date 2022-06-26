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
}


