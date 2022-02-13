import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-easy',
  templateUrl: './easy.component.html',
  styleUrls: ['./easy.component.css']
})
export class EasyComponent implements OnInit {


  errorr = 0;
  flipss = 0;

  constructor() {

  }

  ngOnInit(): void {

  }
  
  onStart() {
    setInterval('increment()', 2000);
  }

  increment() {
    var i=0;
    i++; 
    
  }

}
