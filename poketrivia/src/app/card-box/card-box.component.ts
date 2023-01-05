import { Component, OnInit } from '@angular/core';
import { PoketriviaService } from '../poketrivia.service';


@Component({
  selector: 'app-card-box',
  templateUrl: './card-box.component.html',
  styleUrls: ['./card-box.component.scss']
})
export class CardBoxComponent implements OnInit {

  pokebox: any;
  pokeIdRight: number = 0;
  pokeIdLeft: number = 0;
  result: any;
  

  constructor(private poketriviaService: PoketriviaService ) { 

    this.pokebox = this.poketriviaService.pokebox;
  }

  ngOnInit(): void {
  }


  dropCheck(event: any){

    event.preventDefault();

    // console.log(event.target.nextSibling);

    if (event.offsetX < 100) {

      // console.log('esquerda');

      event.target.style.transform = "translateX(10px)"

      event.target.classList.add('left-place');
      event.target.classList.remove('right-place');

     
        

        if (event.target.previousSibling !== null && event.target.previousSibling.classList.contains('card-drop')) {
          // console.log(event.target.previousSibling.id)

          if (event.target.previousSibling.id < this.poketriviaService.randomPokemon.id && event.target.id > this.poketriviaService.randomPokemon.id) {
            console.log('true');

            this.result = true;
            
          }else{
            console.log('false');
            this.result = false;
          }
        }else if(event.target.previousSibling === null && event.target.id > this.poketriviaService.randomPokemon.id){
          console.log('true');
          this.result = true;
        }else{
          console.log('false');
          this.result = false;
        }
      
      
      
    }
    
    else if (event.offsetX > 100){
      // console.log('direita');

      event.target.classList.add('right-place');
      event.target.classList.remove('left-place');

      event.target.style.transform = "translateX(-10px)"

      if (event.target.nextSibling.tagName == 'DIV') {
        // console.log(event.target.nextSibling.id)

        if (event.target.nextSibling.id > this.poketriviaService.randomPokemon.id && event.target.id < this.poketriviaService.randomPokemon.id) {
          console.log('true');
          this.result = true;
          
        }else{
          // console.log('false');
          this.result = false;
        }
      
      }else if(event.target.nextSibling.tagName !== 'DIV' && event.target.id < this.poketriviaService.randomPokemon.id){
        console.log('true');
        this.result = true;
      }else{
        console.log('false');
        this.result = false;
      }
        
      
    }


    

  }

  dragLeave(event: any){

    // console.log(event);
    

    event.target.removeAttribute('style')
    event.target.classList.remove('left-place', 'right-place');
  }

  checkPokeDrop(event: any){
    event.preventDefault();
    event.target.removeAttribute('style')
    event.target.classList.remove('left-place', 'right-place');

    this.poketriviaService.randomPokemon.result = this.result;

    this.poketriviaService.pokebox.push(this.poketriviaService.randomPokemon);

    this.poketriviaService.pokemon.splice(this.poketriviaService.randomPokemon.index, 1)

    this.poketriviaService.randomizePokemon();
    this.poketriviaService.sortPokemon();
    

    if(this.result === false){

      
      this.poketriviaService.setLife();

      

      console.log(this.poketriviaService.life);
      
    }else{
      this.poketriviaService.setPoints();
    }

    // event.target.scrollIntoView();

    if (this.poketriviaService.life == 0) {
      this.poketriviaService.setHightScore();
      
    }
  }


}
