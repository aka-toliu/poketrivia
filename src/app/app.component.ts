import { Component } from '@angular/core';
import { PoketriviaService } from './poketrivia.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public allPokemon: any;
  public pokebox: any = [];
  public randomPokemon: any;
  public initPokemon: any;
  public life: number = 3;
  public points: number = 0;
  public buttonAction: boolean = false;
  public pokemonGeneration: string = "151";
  public started: boolean = false;
  public highscore: any;
  public finished: boolean = false;
  public help: boolean = false;
  public loading: boolean = false;




  constructor(private poketriviaService: PoketriviaService) {

  }

  ngOnInit(): void {

    let highscore = localStorage.getItem('highscore');
    if (highscore !== null) {
      this.poketriviaService.highscore = highscore;
    } else {
      this.poketriviaService.highscore = 0;
    }

  }

  getPokemons() {

    this.poketriviaService.getAll(this.pokemonGeneration).subscribe((pokemons) => {


      this.poketriviaService.pokemon = pokemons.results;
      this.pokebox = this.poketriviaService.pokebox;
      this.poketriviaService.randomizeInitPokemon();
      this.poketriviaService.randomizePokemon();
      this.randomPokemon = this.poketriviaService.randomPokemon;
      this.initPokemon = this.poketriviaService.initPokemon;
      this.loading = false;

    })
    this.poketriviaService.newpokemon$.subscribe(res => {
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


  shareResults() {
    let result = "⭕ https://poke-trivia.vercel.app | 🥇 My score: " + this.points + " 🏆 Highscore: " + + this.highscore + " | #Poketrivia";

    navigator.clipboard.writeText(result);


    setTimeout(() => {
      this.buttonAction = false;
    }, 2500);
  }


  start() {

    if (this.started == false) {
      this.getPokemons();
    }

  }

  updateLimit() {
    this.poketriviaService.limit = this.pokemonGeneration;
  }

  refresh(): void {
    this.poketriviaService.pokemon = [];
    this.poketriviaService.pokebox = [];
    this.poketriviaService.randomPokemon = {};
    this.randomPokemon = {};
    this.allPokemon = undefined;
    this.pokebox = undefined;
    this.poketriviaService.life = 3;
    this.poketriviaService.points = 0;
    this.life = 3;
    this.points = 0;
    this.finished = false;
    this.loading = true;

    this.getPokemons();

  }

}
