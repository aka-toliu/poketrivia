import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-card-random',
  standalone: false,
  templateUrl: './card-random.component.html',
  styleUrl: './card-random.component.scss'
})
export class CardRandomComponent {

  @Input() name: string = 'Name';
  @Input() num!: number;
  @Input() img!: string;
  @Input() types: string[] = ['type1'];

}
