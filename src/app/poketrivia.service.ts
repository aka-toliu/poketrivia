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
  public newhighscore$: Observable<any> = this.newhighscore.asObservable()

  public finished: boolean = false;
  private newfinished: Subject<any> = new Subject()
  public newfinished$: Observable<any> = this.newfinished.asObservable()

  public life: number = 3;
  private newlife: Subject<number> = new Subject()
  public newlife$: Observable<number> = this.newlife.asObservable()

  public points: number = 0;
  private newpoints: Subject<number> = new Subject()
  public newpoints$: Observable<number> = this.newpoints.asObservable()

  public pokebox: any = [];
  public limit: string = "151";


  public randomPokemon: any;
  private newpokemon: Subject<any> = new Subject()
  public newpokemon$: Observable<any> = this.newpokemon.asObservable()


  public initPokemon: any = {}

  private urlAPI: string = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {

  }


  getAll(Limit: string): Observable<any> {
    return this.http.get<any>(this.urlAPI + '?limit=' + Limit);
  }


  getPokemon(Pokemon: string): Observable<any> {
    return this.http.get<any>(this.urlAPI + '/' + Pokemon);
  }





  // public url: string = 'https://pokeapi.co/api/v2/pokemon?limit=151';





  // get getAllPokemon():Observable<any>{
  //   return this.http.get<any>(this.url).pipe(
  //     tap(
  //       res => res
  //     ),
  //     tap(res => {
  //       res.results.map((resPokemon: any) =>{

  //         this.getPokemon(resPokemon.url).subscribe(
  //           res => resPokemon.dex = res
  //         )

  //       })
  //     })
  //   )
  // }

  // getPokemon(url: string):Observable<any>{
  //   return this.http.get<any>(url).pipe(
  //     map(
  //       res => res
  //     )
  //   )
  // }





  randomizePokemon() {

    // verifica se a array está vazia
    if (this.pokemon.length == 0) {
      this.finished = true;
      this.newfinished.next(this.finished)
    }

    // verifica se há pelo menos 2 pokémon na array
    if (this.pokemon.length > 1) {

      let number = Math.floor(Math.random() * this.pokemon.length);

      this.getPokemon(this.pokemon[number].name).subscribe((pokemon) => {
        this.randomPokemon = pokemon;
        this.randomPokemon.indexOf = this.pokemon.indexOf(this.pokemon[number]);
        // this.pokemon.splice(this.randomPokemon.indexOf, 1);
        this.newpokemon.next(pokemon);
      });

    } else { // se for o ultimo da lista

      let number = 0;
      this.getPokemon(this.pokemon[number].name).subscribe((pokemon) => {
        this.randomPokemon = pokemon;
        this.randomPokemon.indexOf = this.pokemon.indexOf(this.pokemon[number]);
        // this.pokemon.splice(this.randomPokemon.indexOf, 1);
        this.newpokemon.next(pokemon);
      });
    }

  }

  randomizeInitPokemon() {

    let number = Math.floor(Math.random() * this.pokemon.length);

    this.getPokemon(this.pokemon[number].name).subscribe((pokemon) => {
      this.initPokemon = pokemon;
      this.initPokemon.result = true;
      this.pokebox.push(this.initPokemon)
      this.initPokemon.indexOf = this.pokemon.indexOf(this.pokemon[number]);
      this.pokemon.splice(this.initPokemon.indexOf, 1);
    });

  }

  sortPokemon() {

    this.pokebox.sort((a: any, b: any) => {
      if (a.id < b.id) return -1;
      if (a.id > b.id) return 1;
      return 0;
    })
  }

  setLife() {
    this.life = (this.life - 1);
    this.newlife.next(this.life);
  }


  setPoints() {
    this.points = (this.points + 1);
    this.newpoints.next(this.points);
    // console.log(this.points);

  }

  setHightScore() {


    if (this.points > this.highscore && this.highscore !== null) {
      this.highscore = this.points;
    }

    localStorage.setItem('highscore', this.highscore);
    this.newhighscore.next(this.highscore)

    console.log(this.highscore);


  }







}
