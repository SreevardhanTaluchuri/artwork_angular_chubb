import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ArtWork } from 'src/app/interfaces/art';
import { ArtService } from 'src/app/services/art.ts.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit{

  @Input() art! : ArtWork

  constructor(public artService : ArtService){ }

  ngOnInit(): void {
    console.log(this.art);
  }

}
