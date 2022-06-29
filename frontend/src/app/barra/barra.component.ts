import { Component, OnInit } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-barra',
  templateUrl: './barra.component.html',
  styleUrls: ['./barra.component.css']
})

export class BarraComponent implements OnInit {

  constructor(private backend: BackendService, private router: Router) { }

  ngOnInit(): void {
  }
  status: boolean = false;
  clickEvent(){
      this.status = !this.status;       
  }

  formatear(){
    var js:any;
    var resulta;
    this.backend.formatearJSON().subscribe(
      res=>{
        js = JSON.parse(JSON.stringify(res))
        //console.log(JSON.parse(js)[0])
        alert(js.Respuesta)
      },
      err=>{
        alert("Ocurrió un error")
      }
    ) 
  }

  salir(){
    this.router.navigate(['/Login']);
    sessionStorage.removeItem('correo');
  }
}