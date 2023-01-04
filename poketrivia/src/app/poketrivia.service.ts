import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from 'rxjs';
import { map, tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PoketriviaService {

  public pokemon: any = [];

  private newpokemon: Subject<any> = new Subject() 
  public newpokemon$:Observable<any> = this.newpokemon.asObservable()


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

  public pokebox: any = [];




  private url: string = 'https://pokeapi.co/api/v2/pokemon?limit=151';



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
    let number = Math.floor(Math.random() * this.pokemon.length);
    let randomPokemon = this.pokemon[number];
    this.randomPokemon = randomPokemon;   

    this.newpokemon.next(randomPokemon)

    this.randomPokemon.name = this.pokemon[number].name;
    this.randomPokemon.id = this.pokemon[number].dex.id;
    this.randomPokemon.sprite = this.pokemon[number].dex.sprites.front_default
  }

  randomizeInitPokemon(){
    let number = Math.floor(Math.random() * this.pokemon.length);
    this.initPokemon.name = this.pokemon[number].name;
    this.initPokemon.id = this.pokemon[number].dex.id;
    this.initPokemon.sprite = this.pokemon[number].dex.sprites.front_default;
    this.pokebox.push(this.initPokemon)
  }

  sortPokemon(){

  this.pokebox.sort( (a: any, b: any) => {
      if (a.id < b.id) return -1;
      if (a.id > b.id) return 1;
      return 0;
  })
  }







}
