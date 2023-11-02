import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArtWorkComponent } from './pages/art-work/art-work.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/material.module';
import { CardComponent } from './components/card/card.component';
import { ArtComponent } from './pages/art/art.component';
import { ArtListComponent } from './pages/art-list/art-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { SignupComponent } from './pages/signup/signup.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { FavoriteComponent } from './components/favorite/favorite.component';
import { PopupComponent } from './components/popup/popup.component';
// import { SETTINGS as FIRESTORE_SETTINGS } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent,
    ArtWorkComponent,
    SidenavComponent,
    ToolbarComponent,
    CardComponent,
    ArtComponent,
    ArtListComponent,
    SignupComponent,
    LoginComponent,
    FavoritesComponent,
    FavoriteComponent,
    PopupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgxPaginationModule,
    FormsModule,
    provideFirebaseApp(() =>
      initializeApp({
        apiKey: 'AIzaSyCC3WkFxNW0EfV_s3YFmfJaeIlFeFhWPXE',
        authDomain: 'art-users-ca860.firebaseapp.com',
        projectId: 'art-users-ca860',
        storageBucket: 'art-users-ca860.appspot.com',
        messagingSenderId: '76151106674',
        appId: '1:76151106674:web:b1a6a3fb36a3862a82e6eb',
        measurementId: 'G-T0BTT3J41H',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
