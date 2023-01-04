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

  
  
  constructor(private poketriviaService: PoketriviaService ){

  }

  ngOnInit(): void{
      this.poketriviaService.getAllPokemon.subscribe(
        res => 

      { 
        this.poketriviaService.pokemon = res.results;
        this.pokebox = this.poketriviaService.pokebox;
        
        setTimeout(() => {
          this.poketriviaService.randomizePokemon();
          this.poketriviaService.randomizeInitPokemon();
          this.randomPokemon = this.poketriviaService.randomPokemon;
          this.initPokemon = this.poketriviaService.initPokemon;
        }, 500);
      }
        
      )

      this.poketriviaService.newpokemon$.subscribe( res => {
        this.randomPokemon = res
       } )

  }

  // randomizePokemon(){
  //   let number = Math.floor(Math.random() * this.allPokemon.length);
  //   this.randomPokemon = this.allPokemon[number];
  //   this.poketriviaService.randomPokemon = this.randomPokemon;
  // }

  // randomizeInitPokemon(){
  //   let number = Math.floor(Math.random() * this.allPokemon.length);
  //   this.initPokemon.name = this.allPokemon[number].name;
  //   this.initPokemon.id = this.allPokemon[number].dex.id;
  //   this.initPokemon.sprite = this.allPokemon[number].dex.sprites.front_default;
  //   this.poketriviaService.pokebox.push(this.initPokemon)
  // }


}
