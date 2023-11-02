import { Component, OnInit , Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.ts.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  user! : any;
  constructor(private router : Router , private userService : UserService) { }
  
  @Output() toggleSideNav : EventEmitter<string> = new EventEmitter<string>();
  getUser(){
    this.userService.getUserById(sessionStorage.getItem("user") || "").then(user =>{
      this.user = user;
      console.log(user);
    });
  }
  ngOnInit(): void {
    this.getUser();
    this.userService.addNameSubject.subscribe(user=>{
      this.user = user
    })
  }
  logout(){
    sessionStorage.clear();
    this.router.navigate(["/login"]);
    this.user=null;
  }

}
