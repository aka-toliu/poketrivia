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
  public highscore: any;
  public timeout: any = 500;
  public finished: boolean = false;
 

  
  
  constructor(private poketriviaService: PoketriviaService ){

  }

  ngOnInit(): void{
      // this.initPoketrivia();
      let highscore = localStorage.getItem('highscore');
      if(highscore !== null){
        this.poketriviaService.highscore = highscore;
      }else{
        this.poketriviaService.highscore = 0;
      }
      console.log(this.poketriviaService.highscore);
      
      
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
      }, this.timeout);
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

    this.poketriviaService.newhighscore$.subscribe(res => { 
      this.highscore = res
    })

    this.poketriviaService.newfinished$.subscribe(res => { 
      this.finished = res
    })
  }


  shareResults(){
    let result = "⭕ https://poke-trivia.vercel.app | 🥇 My score: " + this.points + " | 🏆 Highscore: " + + this.highscore;

    navigator.clipboard.writeText(result);
  }

    start(){
      
     if (this.started == false) {
      this.initPoketrivia();
     }

  }

  updateLimit(){
    this.poketriviaService.limit = this.pokemonGeneration;
    this.poketriviaService.url = 'https://pokeapi.co/api/v2/pokemon?limit=' + this.pokemonGeneration;

    if (this.poketriviaService.limit === '151')
    {
      this.timeout = 400;
    }
    else if (this.poketriviaService.limit === '251')
    {
      this.timeout = 800;
    }
    else if (this.poketriviaService.limit === '386')
    {
      this.timeout = 1200;
    }
    else if (this.poketriviaService.limit === '493')
    {
      this.timeout = 1600;
    }
    else if (this.poketriviaService.limit === '649')
    {
      this.timeout = 2000;
    }
    else if (this.poketriviaService.limit === '721')
    {
      this.timeout = 2400;
    }
    else if (this.poketriviaService.limit === '809')
    {
      this.timeout = 2800;
    }
    else if (this.poketriviaService.limit === '905')
    {
      this.timeout = 3200;
    }
    else if (this.poketriviaService.limit === '1008')
    {
      this.timeout = 3600;
    }
  }

  refresh(): void {
    window.location.reload();
}

}
