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
  // btnTouch: boolean = false;
  

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
            // console.log('true');

            this.result = true;
            
          }else{
            // console.log('false');
            this.result = false;
          }
        }else if(event.target.previousSibling === null && event.target.id > this.poketriviaService.randomPokemon.id){
          // console.log('true');
          this.result = true;
        }else{
          // console.log('false');
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
          // console.log('true');
          this.result = true;
          
        }else{
          // console.log('false');
          this.result = false;
        }
      
      }else if(event.target.nextSibling.tagName !== 'DIV' && event.target.id < this.poketriviaService.randomPokemon.id){
        // console.log('true');
        this.result = true;
      }else{
        // console.log('false');
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

    this.poketriviaService.pokemon.splice(this.poketriviaService.randomPokemon.index, 1);

    let box = event.target.parentNode;

    this.poketriviaService.randomizePokemon();
    this.poketriviaService.sortPokemon();
    

    if(this.result === false){

      // tira pontos de vida
      this.poketriviaService.setLife();

      

      // console.log(this.poketriviaService.life);
      
    }else{
      this.poketriviaService.setPoints();
    }

    // event.target.scrollIntoView();

    if (this.poketriviaService.life == 0) {
      this.poketriviaService.setHightScore();
      
    }



    
  }



  touch(event: any){
    

    let drops = document.querySelectorAll('.card-drop');

    for (let i = 0; i < drops.length; i++) {
      if(drops[i] !== event.target){
        drops[i].classList.remove('btn--actived');
      }
    }

    if(event.target.classList.contains('card-drop')){
      event.target.classList.toggle('btn--actived');
    }

    event.target.addEventListener("touchmove", ()=>{
      for (let i = 0; i < drops.length; i++) {
       
          drops[i].classList.remove('btn--actived');
        
      }
    });


    
  }


  touchValidade(event: any){
    let card = event.target.parentNode.parentNode;

    if(event.target.classList.contains('L')){


      if(card.previousSibling !== null && card.previousSibling.classList.contains('card-drop')){
        if (card.previousSibling.id < this.poketriviaService.randomPokemon.id && card.id > this.poketriviaService.randomPokemon.id) {
          console.log('true');

          this.result = true;
          
        }else{
          console.log('false');
          this.result = false;
        }
      }
      else if(card.previousSibling === null && card.id > this.poketriviaService.randomPokemon.id){
        console.log('true');
        this.result = true;
      }else{
        console.log('false');
        this.result = false;
      }

      this.poketriviaService.randomPokemon.result = this.result;

    this.poketriviaService.pokebox.push(this.poketriviaService.randomPokemon);

    this.poketriviaService.pokemon.splice(this.poketriviaService.randomPokemon.index, 1);

    let box = event.target.parentNode;

    this.poketriviaService.randomizePokemon();
    this.poketriviaService.sortPokemon();
    

    if(this.result === false){

      // tira pontos de vida
      this.poketriviaService.setLife();

      

      // console.log(this.poketriviaService.life);
      
    }else{
      this.poketriviaService.setPoints();
    }

    // event.target.scrollIntoView();

    if (this.poketriviaService.life == 0) {
      this.poketriviaService.setHightScore();
      
    }


      
    }

    if(event.target.classList.contains('R')){
      if (card.nextSibling.tagName == 'DIV') {
        // console.log(card.nextSibling.id)

        if (card.nextSibling.id > this.poketriviaService.randomPokemon.id && card.id < this.poketriviaService.randomPokemon.id) {
          console.log('true');
          this.result = true;
          
        }else{
          console.log('false');
          this.result = false;
        }
      
      }
      else if(card.nextSibling.tagName !== 'DIV' && card.id < this.poketriviaService.randomPokemon.id){
        console.log('true');
        this.result = true;
      }else{
        console.log('false');
        this.result = false;
      }

      this.poketriviaService.randomPokemon.result = this.result;

    this.poketriviaService.pokebox.push(this.poketriviaService.randomPokemon);

    this.poketriviaService.pokemon.splice(this.poketriviaService.randomPokemon.index, 1);

    let box = event.target.parentNode;

    this.poketriviaService.randomizePokemon();
    this.poketriviaService.sortPokemon();
    

    if(this.result === false){

      // tira pontos de vida
      this.poketriviaService.setLife();

      

      // console.log(this.poketriviaService.life);
      
    }else{
      this.poketriviaService.setPoints();
    }

    // event.target.scrollIntoView();

    if (this.poketriviaService.life == 0) {
      this.poketriviaService.setHightScore();
      
    }

    }

  }





}
