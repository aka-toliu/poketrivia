import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-play',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './play.component.html',
  styleUrl: './play.component.scss'
})
export class PlayComponent {

  public lives: number[] = [1, 1, 1];
  public sequence: number = 0;
  public bestSequence: number = 0;
  public count: number = 0;
  public dex: any[] = [
    {name: 'Name', num: 123}, 
    {name: 'Name', num: 123}, 
    {name: 'Name', num: 123}, 
  ]

}
