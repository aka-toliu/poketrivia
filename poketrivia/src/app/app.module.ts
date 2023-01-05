import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokeCardComponent } from './poke-card/poke-card.component';
import { HudComponent } from './hud/hud.component';
import { CardBoxComponent } from './card-box/card-box.component';
import { PoketriviaService } from './poketrivia.service';
import { HttpClientModule } from '@angular/common/http';
// import { StartScreenComponent } from './start-screen/start-screen.component';

@NgModule({
  declarations: [
    AppComponent,
    PokeCardComponent,
    HudComponent,
    CardBoxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [PoketriviaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
