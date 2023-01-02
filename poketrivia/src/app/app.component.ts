import { Component } from '@angular/core';
import { PoketriviaService } from './poketrivia.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public allPokemon: any;
  public pokebox: any;
  public randomPokemon: any;
  
  constructor(private poketriviaService: PoketriviaService ){

  }

  ngOnInit(): void{
      this.poketriviaService.getAllPokemon.subscribe(
        res => 

      { 
        this.allPokemon = res.results;
        this.pokebox = this.poketriviaService.pokebox;

        console.log(this.pokebox);
        
        setTimeout(() => {
          this.randomizePokemon();
        }, 100);
      }
        
      )

  }

  randomizePokemon(){

    let number = Math.floor(Math.random() * this.allPokemon.length);

    this.randomPokemon = this.allPokemon[number];

    console.log(this.randomPokemon);
    

  }
}
