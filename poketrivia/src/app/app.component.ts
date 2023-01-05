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
  public initPokemon: any;
  public life: number = 3;
  public points: number = 0;
  public buttonAction: boolean = false;
  public pokemonGeneration: string = "151";
  public started: boolean = false;
 

  
  
  constructor(private poketriviaService: PoketriviaService ){

  }

  ngOnInit(): void{
      // this.initPoketrivia();
  }

  initPoketrivia(){
    this.poketriviaService.getAllPokemon.subscribe(
      res => 

    { 
      this.poketriviaService.pokemon = res.results;
      this.pokebox = this.poketriviaService.pokebox;
      
      setTimeout(() => {
        this.poketriviaService.randomizeInitPokemon();
        this.poketriviaService.randomizePokemon();
        this.randomPokemon = this.poketriviaService.randomPokemon;
        this.initPokemon = this.poketriviaService.initPokemon;
      }, 1200);
    }
      
    )

    this.poketriviaService.newpokemon$.subscribe( res => {
      this.randomPokemon = res
     })


     this.poketriviaService.newlife$.subscribe(res => { 
      this.life = res
    })

    this.poketriviaService.newpoints$.subscribe(res => { 
      this.points = res
    })
  }


  shareResults(){
    let result = "🔢 https://github.com/byToliu/poketrivia | 🥇 My score: " + this.points + " | 🏆 Best score: "

    navigator.clipboard.writeText(result);
  }

    start(){
      
     if (this.started == false) {
      this.initPoketrivia();
     }

  }

  updateLimit(){
    this.poketriviaService.limit = this.pokemonGeneration;
    this.poketriviaService.url = 'https://pokeapi.co/api/v2/pokemon?limit=' + this.pokemonGeneration
  }

}
