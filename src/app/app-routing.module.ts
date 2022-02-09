import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DifficultyComponent } from './Components/difficulty/difficulty.component';
import { EasyComponent } from './Components/easy/easy.component';
import { HomeComponent } from './Components/home/home.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'home',component:HomeComponent},
  {path:'difficulty',component:DifficultyComponent},
  {path:'easy',component:EasyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
