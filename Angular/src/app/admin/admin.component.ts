import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  contenido=""
  constructor() { }

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
        this.transformarJSON(this.contenido);
      }
    }
    fileReader.readAsText(file)   
  }

  transformarJSON(inicial:string){
    let obj = JSON.parse(inicial);
    /*for (let i = 0; i < obj.carpetas.length; i++) {
      console.log(obj.carpetas[i]);
      
    }*/
    for (let i = 0; i < obj.archivos.length; i++) {
      console.log(obj.archivos[i]);
      
    }
  }
}


