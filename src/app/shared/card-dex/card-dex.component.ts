import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-card-dex',
  standalone: false,
  templateUrl: './card-dex.component.html',
  styleUrl: './card-dex.component.scss'
})
export class CardDexComponent {

  @Input() name!: string;
  @Input() num!: number;
  @Input() img!: string;
  
  @ViewChild('card') card!: ElementRef;

  onDragOver(event: DragEvent){
    event.preventDefault();
    // console.log('offset-x', event.offsetX, 'offset-y', event.offsetY);
    console.log(event);
    

    if(event.offsetX < 90){
      console.log('esquerda');
      this.card.nativeElement.classList.add('c-card-dex--left');
      this.card.nativeElement.classList.remove('c-card-dex--right');
    }

    if(event.offsetX > 90){
      console.log('direita');
      this.card.nativeElement.classList.add('c-card-dex--right');
      this.card.nativeElement.classList.remove('c-card-dex--left');
    }

    // if(event.offsetX <= 0 || event.offsetX > 180 || event.offsetY <= 0 || event.offsetY > 220 ){
    //   this.card.nativeElement.classList.remove('c-card--right');
    //   this.card.nativeElement.classList.remove('c-card--left');
    // }
    
  }

  onDragLeave(event: DragEvent){
    console.log('dragleave', event);
      this.card.nativeElement.classList.remove('c-card-dex--right');
      this.card.nativeElement.classList.remove('c-card-dex--left');
  }

  onDrop(event: DragEvent){
    console.log('drop', event);
    this.card.nativeElement.classList.remove('c-card-dex--right');
    this.card.nativeElement.classList.remove('c-card-dex--left');
  }
  
}
