import { Component, OnInit } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  collectionSnapshots,
  getDoc,
  getFirestore,
} from '@angular/fire/firestore';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { doc } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.ts.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(private fireStore: Firestore , private userService : UserService, private _snackBar: MatSnackBar,private router : Router) {}
  users!: User[];
  message! : string;
  addUser(f: any) {
    const found = this.users.find(user => user.username == f.value.username);
    if(!found){
      this.userService.addUser({...f.value , favorites : []});
      setTimeout(() => {
        this.router.navigate(["/login"])
      },1000)
    }else{
      this.openSnackBar('User already exists!').onAction().subscribe(() => {});
      setTimeout(() => {
      },2000)
    }
  }

  openSnackBar(message : string) : MatSnackBarRef<SimpleSnackBar> {
    return this._snackBar.open(message ,"" , {
      duration : 2000,
    })
  }

  getUsers(){
    if(sessionStorage.getItem("user")){
      this.router.navigate(["/artworks"])
    }
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  ngOnInit(): void {
    this.getUsers();
  }
}
