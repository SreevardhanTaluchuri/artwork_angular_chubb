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
        apiKey: "AIzaSyD2O6RqVNy4ochpMQJFbQBxVk0QzdArnO8",
        authDomain: "art-users.firebaseapp.com",
        databaseURL: "https://art-users-default-rtdb.firebaseio.com",
        projectId: "art-users",
        storageBucket: "art-users.appspot.com",
        messagingSenderId: "109851637278",
        appId: "1:109851637278:web:da45604245a8297880e00f",
        measurementId: "G-X7JDKJ1VHV"
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
