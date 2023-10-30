import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtWorkComponent } from './pages/art-work/art-work.component';
import { ArtListComponent } from './pages/art-list/art-list.component';
import { ArtComponent } from './pages/art/art.component';
import { SignupComponent } from './pages/signup/signup.component';

const routes: Routes = [
  {
    path : 'artworks',
    component : ArtListComponent,
  },
  {
    path : 'singup',
    component : SignupComponent,
  },
  {
    path : 'artwork',
    component : ArtWorkComponent,
    children : [
      {
        path : ':id',
        component : ArtComponent
      }
    ]
  },
  {
    path : '' , 
    redirectTo : 'artwork' , 
    pathMatch : 'full'
},
{
    path : '**', 
    redirectTo : 'artwork', 
    pathMatch : 'full'
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
