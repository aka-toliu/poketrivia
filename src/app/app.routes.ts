import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PlayComponent } from './pages/play/play.component';
import { RankedComponent } from './pages/ranked/ranked.component';

export const routes: Routes = [
    { path: 'play', title: 'Play',  component: PlayComponent},
    { path: 'ranked', title: 'Ranked',  component: RankedComponent},
    { path: '', title: 'Poketrivia', component: HomeComponent},
];
