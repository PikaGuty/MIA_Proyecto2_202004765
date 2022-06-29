import { Component, OnInit } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-barrausr',
  templateUrl: './barrausr.component.html',
  styleUrls: ['./barrausr.component.css']
})
export class BarrausrComponent implements OnInit {

  correo="";

  constructor(private backend: BackendService, private router: Router) {
    let data = sessionStorage.getItem('correo');
    console.log(data)
    if(data!=null){
      this.correo=data;
    }
  }

  ngOnInit(): void {
  }
  status: boolean = false;
  clickEvent(){
      this.status = !this.status;       
  }
  
  salir(){
    
    this.router.navigate(['/Login']);
    sessionStorage.removeItem('correo');
    
  }

  

  
}
