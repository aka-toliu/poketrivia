import { Component, OnInit } from '@angular/core';
import { PoketriviaService } from '../poketrivia.service';

@Component({
  selector: 'app-hud',
  templateUrl: './hud.component.html',
  styleUrls: ['./hud.component.scss']
})
export class HudComponent implements OnInit {

  life: number = 0;
  

  constructor(private poketriviaService: PoketriviaService) { 
    this.life = this.poketriviaService.life;

    console.log(this.life);
    
  }

  ngOnInit(): void {
  }

}
