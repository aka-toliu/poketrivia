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


  

  constructor(private poketriviaService: PoketriviaService) { }

  ngOnInit(): void {
    
    
  }

  carddrag(event: any){
    // console.log(event);

    event.target.style.opacity = "0.2"

  }

  dragend(event: any){
    // console.log(event);

    event.target.style.opacity = "1"

  }

  touchend(event: any){
    
    let card = event.target;
    card.removeAttribute("style", "position");

    let cardsDrop = document.querySelectorAll('.card-drop');

    for (let i = 0; i < cardsDrop.length; i++) {
      
      cardsDrop[i].classList.remove('left-place', 'right-place');
    }

  }


  touchmove(event: any){
   
    
    // console.log(event);
        // grab the location of touch
        var touchLocation = event.targetTouches[0];

        var card = touchLocation.target;
        // let newCard = card.cloneNode(true);
        // card.appendChild(newCard)

        // console.log(card);
        
    
        // assign box new coordinates based on the touch.
        card.style.position = 'fixed';
        card.style.left = touchLocation.pageX - 100 + 'px';
        card.style.top = touchLocation.pageY - 100 + 'px';




        let cardsDrop = document.querySelectorAll('.card-drop');



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

                      if(pontos_card[i].x < (cardCollider.width + dropCollider.left / 2)){
                          console.log('esquerda');
                          element.classList.add('left-place');
                          element.classList.remove('right-place');
                          
                      }

                      if(pontos_card[i].x > (cardCollider.width + dropCollider.left / 2)){
                        console.log('direita');
                        element.classList.add('right-place');
                        element.classList.remove('left-place');
                        
                    }
                            
  
              }
          }
  
  
      });
    
  }

}
