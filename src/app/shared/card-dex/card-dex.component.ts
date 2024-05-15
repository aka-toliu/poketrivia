import { Component, ElementRef, Input, ViewChild } from '@angular/core';

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
  
}
