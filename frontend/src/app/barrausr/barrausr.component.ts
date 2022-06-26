import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-barrausr',
  templateUrl: './barrausr.component.html',
  styleUrls: ['./barrausr.component.css']
})
export class BarrausrComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  status: boolean = false;
  clickEvent(){
      this.status = !this.status;       
  }

}
