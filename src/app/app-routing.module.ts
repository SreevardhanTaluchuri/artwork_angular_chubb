import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtWorkComponent } from './pages/art-work/art-work.component';
import { ArtListComponent } from './pages/art-list/art-list.component';
import { ArtComponent } from './pages/art/art.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { User } from './interfaces/user';
import { FavoritesComponent } from './pages/favorites/favorites.component';

const getUser = () : string | null => {
  const user = sessionStorage.getItem("user");
  console.log(user);
  return user;
}

const routes: Routes = [
  {
    path : 'artworks',
    component : ArtListComponent
  },
  {
    path : 'signup',
    component : SignupComponent,
  },
  {
    path : 'login',
    component : LoginComponent,
  },
  {
    path : 'favorites',
    component : FavoritesComponent,
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
    redirectTo : getUser() ? "artworks" : "login",
    pathMatch : 'full'
},
{
    path : '**', 
    redirectTo : getUser() ? "artworks" : "login", 
    pathMatch : 'full'
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
