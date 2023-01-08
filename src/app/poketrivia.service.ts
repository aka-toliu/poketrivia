import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from 'rxjs';
import { map, tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PoketriviaService {

  public pokemon: any = [];
  public highscore: any;
  private newhighscore: Subject<any> = new Subject() 
  public newhighscore$:Observable<any> = this.newhighscore.asObservable()

  private newpokemon: Subject<any> = new Subject() 
  public newpokemon$:Observable<any> = this.newpokemon.asObservable()

  public finished: boolean = false;
  private newfinished: Subject<any> = new Subject() 
  public newfinished$:Observable<any> = this.newfinished.asObservable()



  public randomPokemon: any = {
    name: "",
    id: 0,
    sprite: "",
    type1: "",
    type2: "",
    status: 'actual',
  };


  public initPokemon: any = {
    name: "",
    id: 0,
    sprite: "",
    type1: "",
    type2: "",
    status: 'selected',
    result: true

  }

  public life: number = 3;
  private newlife: Subject<number> = new Subject() 
  public newlife$:Observable<number> = this.newlife.asObservable()


  public points: number = 0;
  private newpoints: Subject<number> = new Subject() 
  public newpoints$:Observable<number> = this.newpoints.asObservable()

  public pokebox: any = [];


  public limit: string = "151";



  public url: string = 'https://pokeapi.co/api/v2/pokemon?limit=151';



  constructor(private http: HttpClient) {
    
   }


  get getAllPokemon():Observable<any>{
    return this.http.get<any>(this.url).pipe(
      tap(
        res => res
      ),
      tap(res => {
        res.results.map((resPokemon: any) =>{
          
          this.getPokemon(resPokemon.url).subscribe(
            res => resPokemon.dex = res
          )

        })
      })
    )
  }

  getPokemon(url: string):Observable<any>{
    return this.http.get<any>(url).pipe(
      map(
        res => res
      )
    )
  }

  randomizePokemon(){

    // console.log(this.pokemon);

        
    if (this.pokemon.length == 0) {
      this.finished = true;
      this.newfinished.next(this.finished)
      console.log(this.finished);
    }

    if (this.pokemon.length > 1) {
      let number = Math.floor(Math.random() * this.pokemon.length);
    let randomPokemon = this.pokemon[number];
    this.randomPokemon = randomPokemon;   

    this.newpokemon.next(randomPokemon)

    this.randomPokemon.name = this.pokemon[number].name;
    this.randomPokemon.id = this.pokemon[number].dex.id;
    this.randomPokemon.sprite = this.pokemon[number].dex.sprites.front_default
    this.randomPokemon.index = this.pokemon.indexOf(this.pokemon[number]);
    }else{
      let number = 0;
    let randomPokemon = this.pokemon[number];
    this.randomPokemon = randomPokemon;   

    this.newpokemon.next(randomPokemon)

    this.randomPokemon.name = this.pokemon[number].name;
    this.randomPokemon.id = this.pokemon[number].dex.id;
    this.randomPokemon.sprite = this.pokemon[number].dex.sprites.front_default
    this.randomPokemon.index = this.pokemon.indexOf(this.pokemon[number]);
    }
  
  }

  randomizeInitPokemon(){
    let number = Math.floor(Math.random() * this.pokemon.length);
    this.initPokemon.name = this.pokemon[number].name;
    this.initPokemon.id = this.pokemon[number].dex.id;
    this.initPokemon.sprite = this.pokemon[number].dex.sprites.front_default;
    this.pokebox.push(this.initPokemon)
    this.initPokemon.index = this.pokemon.indexOf(this.pokemon[number]);
    this.pokemon.splice(this.initPokemon.index, 1)
    // console.log(this.pokemon);
    
  }

  sortPokemon(){

  this.pokebox.sort( (a: any, b: any) => {
      if (a.id < b.id) return -1;
      if (a.id > b.id) return 1;
      return 0;
  })
  }

  setLife(){
    this.life = (this.life - 1);
    this.newlife.next(this.life);
  }


  setPoints(){
    this.points = (this.points + 1);
    this.newpoints.next(this.points);
    // console.log(this.points);
    
  }

  setHightScore(){
    

    if (this.points > this.highscore && this.highscore !== null) {
      this.highscore = this.points;
    }

    localStorage.setItem('highscore', this.highscore);
    this.newhighscore.next(this.highscore)

    console.log(this.highscore);
    
    
  }







}
