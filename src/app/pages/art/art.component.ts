import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtWork } from 'src/app/interfaces/art';
import { ArtService } from 'src/app/services/art.ts.service';

@Component({
  selector: 'app-art',
  templateUrl: './art.component.html',
  styleUrls: ['./art.component.css'],
})
export class ArtComponent implements OnInit {
  art!: ArtWork;
  isLoading : boolean = true;

  constructor(public artService: ArtService, private route: ActivatedRoute , private router : Router) {}

  getArtWorkBasedOnId(id: String) {
    this.artService.getArtWorkBasedOnId(id).subscribe({
      next: (art) =>{
        this.art = art.data
        this.isLoading = false;
      },
      error: (err) => console.log(err),
    });
  }

  ngOnInit(): void {
    if (!sessionStorage.getItem('user')) {
      this.router.navigate(['/login']);
    }
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id') || '';
      this.getArtWorkBasedOnId(id);
    });
  }
}
