import { Component, OnInit } from '@angular/core';
import { PoketriviaService } from '../poketrivia.service';


@Component({
  selector: 'app-card-box',
  templateUrl: './card-box.component.html',
  styleUrls: ['./card-box.component.scss']
})
export class CardBoxComponent implements OnInit {

  pokebox: any;

  constructor(private poketriviaService: PoketriviaService ) { 

    this.pokebox = this.poketriviaService.pokebox;
  }

  ngOnInit(): void {
  }

}
