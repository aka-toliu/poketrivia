import { SharedModule } from './shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { RouterModule } from '@angular/router';
import { NgDragDropModule } from 'ng-drag-drop';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    AngularFireModule.initializeApp(environment.firebase),
    NgDragDropModule.forRoot()
  ]
})
export class AppModule { }
