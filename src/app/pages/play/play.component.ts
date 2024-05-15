import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { types } from 'util';

@Component({
  selector: 'app-play',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './play.component.html',
  styleUrl: './play.component.scss'
})
export class PlayComponent {

  // HUD
  public lives: number[] = [1, 1, 1];
  public sequence: number = 0;
  public bestSequence: number = 0;
  public count: number = 0;

  // POKES
  public dex: any[] = [
    {name: 'Name', num: 123}, 
    {name: 'Name', num: 123}, 
    {name: 'Name', num: 123}, 
  ]

  public actualRandom = {
    name: 'Name',
    num: 456,
    types: [
      'Eletric', 'Water'
    ]
  }

}
