import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild, input } from '@angular/core';

@Component({
  selector: 'app-card-random',
  standalone: false,
  templateUrl: './card-random.component.html',
  styleUrl: './card-random.component.scss',
  // host:{
  //   '(document:mousemove)': 'onMove($event)'
  // }
})
export class CardRandomComponent implements OnInit, AfterViewInit {


  
  @Input() name: string = 'Name';
  @Input() num!: number;
  @Input() img!: string;
  @Input() types: string[] = ['type1'];
  
  @ViewChild('card') card!: ElementRef;
  
  public isTouched = false;
  
  
  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    console.log(this.card);
  }
  
  

  onStart(event: Event){
    console.log('start', event);
  }

  onDrag(event: Event){
    // console.log('dragging', event);
  }

  
  onEnd(event: Event){
    console.log('end',event);
  }

}
