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
  public initPokemon: any = {
    name: "",
    id: 0,
    sprite: "",
    type1: "",
    type2: "",
    status: 'actual',
    result: true

  }
  
  constructor(private poketriviaService: PoketriviaService ){

  }

  ngOnInit(): void{
      this.poketriviaService.getAllPokemon.subscribe(
        res => 

      { 
        this.allPokemon = res.results;
        this.pokebox = this.poketriviaService.pokebox;
        
        setTimeout(() => {
          this.randomizePokemon();
          this.randomizeInitPokemon();
        }, 300);
      }
        
      )

  }

  randomizePokemon(){
    let number = Math.floor(Math.random() * this.allPokemon.length);
    this.randomPokemon = this.allPokemon[number];
    this.poketriviaService.actualPokemon = this.randomPokemon;
  }

  randomizeInitPokemon(){
    let number = Math.floor(Math.random() * this.allPokemon.length);
    this.initPokemon.name = this.allPokemon[number].name;
    this.initPokemon.id = this.allPokemon[number].dex.id;
    this.initPokemon.sprite = this.allPokemon[number].dex.sprites.front_default;
    this.poketriviaService.pokebox.push(this.initPokemon)
  }


}
