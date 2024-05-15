import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardRandomComponent } from './card-random/card-random.component';
import { CardDexComponent } from './card-dex/card-dex.component';



@NgModule({
  declarations: [
    CardRandomComponent,
    CardDexComponent

  ],
  imports: [
    CommonModule,
    
  ],
  exports: [
    CardRandomComponent,
    CardDexComponent
  ]
})
export class SharedModule { }
