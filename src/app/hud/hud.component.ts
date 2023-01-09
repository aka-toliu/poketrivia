import { Component, Input, OnInit } from '@angular/core';
import { PoketriviaService } from '../poketrivia.service';

@Component({
  selector: 'app-hud',
  templateUrl: './hud.component.html',
  styleUrls: ['./hud.component.scss']
})
export class HudComponent implements OnInit {

  // life: number = 0;

  @Input() public life!: any;
  @Input() public points!: any;
  

  constructor(private poketriviaService: PoketriviaService) { 
    // this.life = this.poketriviaService.life;


    
  }

  ngOnInit(): void {

    this.poketriviaService.newlife$.subscribe(
      res => 
    { 
      // this.life = res

    })

  }

}
