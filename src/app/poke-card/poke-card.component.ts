import { Component, Input, OnInit } from '@angular/core';
import { PoketriviaService } from '../poketrivia.service';

@Component({
  selector: 'app-poke-card',
  templateUrl: './poke-card.component.html',
  styleUrls: ['./poke-card.component.scss']
})
export class PokeCardComponent implements OnInit {

  @Input() public nome!: any;
  @Input() public tipo1!: any;
  @Input() public tipo2!: any;
  @Input() public sprite!: any;

  public allowDrop: boolean = false;
  public result: any;




  constructor(private poketriviaService: PoketriviaService) { }

  ngOnInit(): void {


  }

  carddrag(event: any) {
    // console.log(event);

    event.target.style.opacity = "0.2"

  }

  dragend(event: any) {
    // console.log(event);

    event.target.style.opacity = "1"

  }

  touchend(event: any) {

    let card = event.target;
    card.removeAttribute("style", "position");

    let cardsDrop = document.querySelectorAll('.card-drop');

    for (let i = 0; i < cardsDrop.length; i++) {

      cardsDrop[i].classList.remove('left-place', 'right-place');
    }

    console.log('end');


  }


  touchmove(event: any) {





    // console.log(event);
    // grab the location of touch
    var touchLocation = event.targetTouches[0];

    var card: any = touchLocation.target;
    // let newCard = card.cloneNode(true);
    // card.appendChild(newCard)

    // console.log(card);


    // assign box new coordinates based on the touch.
    card.style.position = 'fixed';
    card.style.left = touchLocation.pageX - 100 + 'px';
    card.style.top = touchLocation.pageY - 100 + 'px';




    let cardsDrop = document.querySelectorAll('.card-drop');
    let box = document.querySelectorAll('.card-box');
    // let main = document.querySelectorAll('.main-top');
    // let stepCard = document.createElement('div');
    // stepCard.classList.add('card-drop-step');
    // main[0].appendChild(stepCard);


    cardsDrop.forEach(element => {

      var dropCollider = element.getBoundingClientRect();
      var cardCollider = card.getBoundingClientRect();


      var pontos_card = [

        { x: cardCollider.left, y: cardCollider.top },
        { x: cardCollider.left + cardCollider.width, y: cardCollider.top },
        { x: cardCollider.left + cardCollider.width, y: cardCollider.top + cardCollider.height },
        { x: cardCollider.left, y: cardCollider.top + cardCollider.heigt }
      ]

      var pontos_drop = [

        { x: dropCollider.left, y: dropCollider.top },
        { x: dropCollider.left + dropCollider.width, y: dropCollider.top },
        { x: dropCollider.left + dropCollider.width, y: dropCollider.top + dropCollider.height },
        { x: dropCollider.left, y: dropCollider.top + dropCollider.height }
      ]



      for (let i = 0; i < 3; i++) {
        if ((pontos_card[i].x >= dropCollider.left &&
          pontos_card[i].x <= dropCollider.left + dropCollider.width &&
          pontos_card[i].y >= dropCollider.top &&
          pontos_card[i].y <= dropCollider.top + dropCollider.height) ||

          (pontos_drop[i].x >= cardCollider.left &&
            pontos_drop[i].x <= cardCollider.left + cardCollider.width &&
            pontos_drop[i].y >= cardCollider.top &&
            pontos_drop[i].y <= cardCollider.top + cardCollider.height)) {


          // console.log(dropCollider.left);
          // console.log(pontos_card[i].x);

          if (pontos_card[i].x < (cardCollider.width + dropCollider.left / 2) && pontos_drop[i].y >= cardCollider.top && pontos_drop[i].y <= cardCollider.top + cardCollider.height) {



              for (let i = 0; i < cardsDrop.length; i++) {
                cardsDrop[i].classList.remove('left-place', 'right-place');
              }


            console.log('esquerda');
            element.classList.add('left-place');
            element.classList.remove('right-place');

            let prevDrop: any = element.previousSibling;


            if (prevDrop !== null && prevDrop.classList.contains('card-drop')) {
              if (prevDrop.id < this.poketriviaService.randomPokemon.id && element.id > this.poketriviaService.randomPokemon.id) {
                console.log('true');
                this.result = true;
              } else {
                console.log('false');
              }
            } else if (prevDrop === null && element.id > this.poketriviaService.randomPokemon.id) {
              console.log('true');
              this.result = true;
            } else {
              console.log('false');
              this.result = false;
            }






            card.addEventListener("touchend", () => {


              if (this.allowDrop == true) {
                this.allowDrop = false;
                console.log('dropou');
                this.poketriviaService.randomPokemon.result = this.result;

                this.poketriviaService.pokebox.push(this.poketriviaService.randomPokemon);

                this.poketriviaService.pokemon.splice(this.poketriviaService.randomPokemon.index, 1);


                this.poketriviaService.randomizePokemon();
                this.poketriviaService.sortPokemon();


                if (this.result === false) {

                  // tira pontos de vida
                  this.poketriviaService.setLife();

                } else {
                  this.poketriviaService.setPoints();
                }

                if (this.poketriviaService.life == 0) {
                  this.poketriviaService.setHightScore();

                }
              }


            });

          }

          if (pontos_card[i].x > (cardCollider.width + dropCollider.left / 2) && pontos_drop[i].y >= cardCollider.top && pontos_drop[i].y <= cardCollider.top + cardCollider.height) {
            console.log('direita');


              for (let i = 0; i < cardsDrop.length; i++) {
                cardsDrop[i].classList.remove('left-place', 'right-place');
              }

            
            element.classList.add('right-place');
            element.classList.remove('left-place');

            // console.log(element.nextSibling);


            let nextDrop: any = element.nextSibling;

            if (nextDrop.tagName == 'DIV') {
              if (nextDrop.id > this.poketriviaService.randomPokemon.id && element.id < this.poketriviaService.randomPokemon.id) {
                console.log('true');
                this.result = true;
              } else {
                console.log('false');
              }
            } else if (nextDrop.tagName !== 'DIV' && element.id < this.poketriviaService.randomPokemon.id) {
              console.log('true');
              this.result = true;
            } else {
              console.log('false');
              this.result = false;
            }

            card.addEventListener("touchend", () => {


              if (this.allowDrop == true) {
                this.allowDrop = false;
                console.log('dropou');
                this.poketriviaService.randomPokemon.result = this.result;

                this.poketriviaService.pokebox.push(this.poketriviaService.randomPokemon);

                this.poketriviaService.pokemon.splice(this.poketriviaService.randomPokemon.index, 1);


                this.poketriviaService.randomizePokemon();
                this.poketriviaService.sortPokemon();


                if (this.result === false) {

                  // tira pontos de vida
                  this.poketriviaService.setLife();

                } else {
                  this.poketriviaService.setPoints();
                }

                if (this.poketriviaService.life == 0) {
                  this.poketriviaService.setHightScore();

                }
              }


            });

          }

          this.allowDrop = true


        }
      }


    });



    box.forEach(element => {

      var boxCollider = element.getBoundingClientRect();
      var cardCollider = card.getBoundingClientRect();


      var pontos_card = [

          { x: cardCollider.left, y: cardCollider.top },
          { x: cardCollider.left + cardCollider.width, y: cardCollider.top },
          { x: cardCollider.left + cardCollider.width, y: cardCollider.top + cardCollider.height },
          { x: cardCollider.left, y: cardCollider.top + cardCollider.heigt }
      ]

      var pontos_box = [

          { x: boxCollider.left, y: boxCollider.top },
          { x: boxCollider.left + boxCollider.width, y: boxCollider.top },
          { x: boxCollider.left + boxCollider.width, y: boxCollider.top + boxCollider.height },
          { x: boxCollider.left, y: boxCollider.top + boxCollider.height }
      ]



      for (let i = 0; i < 3; i++) {
          if ((pontos_card[i].x >= boxCollider.left &&
              pontos_card[i].x <= boxCollider.left + boxCollider.width &&
              pontos_card[i].y >= boxCollider.top &&
              pontos_card[i].y <= boxCollider.top + boxCollider.height) ||

              (pontos_box[i].x >= cardCollider.left &&
                  pontos_box[i].x <= cardCollider.left + cardCollider.width &&
                  pontos_box[i].y >= cardCollider.top &&
                  pontos_box[i].y <= cardCollider.top + cardCollider.height)) {

              this.allowDrop = true;


          }else{
            this.allowDrop = false;
          }
      }


  });

  }

}
