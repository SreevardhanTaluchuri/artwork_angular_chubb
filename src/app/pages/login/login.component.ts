import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.ts.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  users!: User[];
  progressValue: number = 0;
  constructor(private userService: UserService, private router: Router,private _snackBar: MatSnackBar) {}

  getUsers() {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('user')) {
      this.router.navigate(['/artworks']);
    }
    this.getUsers();
  }

  openSnackBar(message : string) : MatSnackBarRef<SimpleSnackBar> {
    return this._snackBar.open(message ,"" , {
      duration : 2000,
    })
  }

  loginUser(f: any) {
    const userFound = this.users.find(
      (user) => user.username == f.value.username
    );
    if (userFound) {
      if (userFound.password == f.value.password) {
        sessionStorage.setItem('user', userFound.id);
        this.userService.addName(userFound);
        this.router.navigate(['/artworks']);
      } else {
        this.openSnackBar('Invalid password');
      }
    }else{
      this.openSnackBar('No user exists above credentials');
    }
  }
}
