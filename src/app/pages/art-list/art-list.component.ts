import {
  ChangeDetectorRef,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatFabButton } from '@angular/material/button';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
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
  perPage!: number;
  totalPages: number = 120203;
  isLoading: boolean = true;
  currentPageNumber: number = 0;
  limit: number = 10;
  page!: number;
  constructor(
    private artService: ArtService,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.artWork = this.artService.artWork;
    // console.log(this.artWork);
  }

  getArtWork() {
    this.artService.getArtWork().subscribe({
      next: () => {
        this.isLoading = false;
        this.artWork = this.artService.artWork;
        this.totalPages = this.artService.pagination.total;
        console.log(this.artWork.length);
      },
      error: (err) => console.log(err),
    });
    // console.log(this.artService.artWork);
  }

  ngOnInit(): void {
    if (!sessionStorage.getItem('user')) {
      this.router.navigate(['/login']);
    }
    this.getArtWork();
  }

  changeArtBasedOnSearch(event: any) {
    this.isLoading = true;
    this.artService.getArtWorkBasedOnSearch().subscribe({
      next: (artWork) => {
        this.isLoading = false;
        this.artWork = artWork.data;
        this.totalPages = this.artService.pagination.total;
        this.currentPageNumber = this.page;
      },
      error: (err) => console.log(err),
    });
  }

  updateArtList() {
    this.isLoading = true;
    this.artService
      .getArtWorkBasedOnPage(String(this.limit), String(this.page))
      .subscribe({
        next: (artWork) => {
          this.artWork = artWork.data;
          this.isLoading = false;
          this.totalPages = this.artService.pagination.total;
          this.currentPageNumber = this.page;
        },
        error: (err) => console.log(err),
      });
  }

  limitChange(event: number) {
    this.limit = event;
    this.updateArtList();
  }

  onPageChange(event: number) {
    this.page = event;
    this.updateArtList();
  }
}
