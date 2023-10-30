import { Component, OnInit , Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  constructor() { }
  
  @Output() toggleSideNav : EventEmitter<string> = new EventEmitter<string>();
  ngOnInit(): void {
  }

}
