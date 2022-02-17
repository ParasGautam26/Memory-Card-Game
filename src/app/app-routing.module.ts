import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DifficultyComponent } from './Components/difficulty/difficulty.component';
import { EasyComponent } from './Components/easy/easy.component';
import { HardComponent } from './Components/hard/hard.component';
import { HomeComponent } from './Components/home/home.component';
import { MediumComponent } from './Components/medium/medium.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'home',component:HomeComponent},
  {path:'difficulty',component:DifficultyComponent},
  {path:'easy',component:EasyComponent},
  {path:'medium',component:MediumComponent},
  {path:'hard',component:HardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
