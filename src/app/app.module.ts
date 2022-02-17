import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DifficultyComponent } from './Components/difficulty/difficulty.component';
import { HomeComponent } from './Components/home/home.component';
import { EasyComponent } from './Components/easy/easy.component';
import { MediumComponent } from './Components/medium/medium.component';
import { HardComponent } from './Components/hard/hard.component';

@NgModule({
  declarations: [
    AppComponent,
    DifficultyComponent,
    HomeComponent,
    EasyComponent,
    MediumComponent,
    HardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
