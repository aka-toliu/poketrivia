import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { map, tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PoketriviaService {

  public pokemon = [];
  public actualPokemon: any;

  public life: number = 3;

  public pokebox: any = [
    {
      name: "bulbasaur",
      id: 1
    }

  ];

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

}
