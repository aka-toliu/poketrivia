import { Component, Input, OnInit } from '@angular/core';
import { PoketriviaService } from '../poketrivia.service';

@Component({
  selector: 'app-poke-card',
  templateUrl: './poke-card.component.html',
  styleUrls: ['./poke-card.component.scss']
})
export class PokeCardComponent implements OnInit {

  @Input() public nome!: any;
  @Input() public tipo1!: any;
  @Input() public tipo2!: any;
  @Input() public sprite!: any;


  

  constructor(private poketriviaService: PoketriviaService) { }

  ngOnInit(): void {
    
    
  }

  carddrag(){
    console.log('drag start');
    
  }

}
