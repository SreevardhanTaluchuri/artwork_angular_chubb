import {
  ChangeDetectorRef,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { ArtWork } from 'src/app/interfaces/art';
import { ArtService } from 'src/app/services/art.ts.service';

@Component({
  selector: 'app-art-list',
  templateUrl: './art-list.component.html',
  styleUrls: ['./art-list.component.css'],
})
export class ArtListComponent implements OnChanges, OnInit {
  artWork!: ArtWork[];
  perPage! : number ;
  totalPages : number = 123203 ;
  currentPageNumber : number = 0 ;
  constructor(
    private artService: ArtService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.artWork = this.artService.artWork;
    // console.log(this.artWork);
  }

  ngOnInit(): void {
    this.artWork = this.artService.artWork;
    console.log(this.artWork.length);
  }

  onPageChange(event : number){
    this.artService.getArtWorkBasedOnPage("10" , String(event)).subscribe({
      next : artWork => {
        this.artWork = artWork.data;
        this.totalPages = 123203;
        this.currentPageNumber = event;
      },
      error: (err) => console.log(err),
    })
    }

}
