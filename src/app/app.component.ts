import { Component, OnInit } from '@angular/core';
import { ArtService } from './services/art.ts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'art-institute';
  isLoading : boolean = true;
  constructor(private artService : ArtService){ }

  getArtWork() {
    this.artService.getArtWork().subscribe({
      next : () => this.isLoading = false,
      error: (err) => console.log(err),
    });
    // console.log(this.artService.artWork);
  }

  ngOnInit(): void {
    this.getArtWork();
  }
}
