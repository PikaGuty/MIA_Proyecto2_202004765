import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pop-up-propietario',
  templateUrl: './pop-up-propietario.component.html',
  styleUrls: ['./pop-up-propietario.component.css']
})
export class PopUpPropietarioComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any) { 
    
  }

  ngOnInit(): void {
  }

}
