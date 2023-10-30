import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

const SMALL_WIDTH_BREAKPOINT = 768;
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  @Input() isLoading = true;
  opened! : boolean;
  isScreenSmall! : boolean;
  @ViewChild(MatSidenav) sidenav! : MatSidenav;
  constructor(private _breakPointObserver : BreakpointObserver , private router : Router) { }

  ngOnInit(): void {
    this._breakPointObserver.observe([`(max-width : ${SMALL_WIDTH_BREAKPOINT}px)`]).subscribe(
      (state : BreakpointState)=> {
        this.isScreenSmall = state.matches;
      }
    )

    this.router.events.subscribe(() => {
      if(this.isScreenSmall){
        this.sidenav.close()
      }
    })
  }

}
