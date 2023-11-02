import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ArtWork } from 'src/app/interfaces/art';
import { User } from 'src/app/interfaces/user';
import { ArtService } from 'src/app/services/art.ts.service';
import { UserService } from 'src/app/services/user.ts.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent implements OnInit {
  isLoading: boolean = true;
  user!: User;
  arts: ArtWork[] = [];
  empty : boolean = true;
  constructor(
    private artService: ArtService,
    private userService: UserService
  ) {}

  getAllFavorites() {
    const id = sessionStorage.getItem('user') || '';
    this.userService.getUserById(id).then((user: any) => {
      this.user = user as User;
      let favorites: string[];

      if (user.favorites.arrayValue.values)
        favorites = user.favorites.arrayValue.values.map(
          (item: any) => item.stringValue
        );
      else favorites = this.user.favorites || [];
      if(favorites.length > 0){
        this.empty = false;
        favorites.forEach((item , index) => {
          this.artService.getArtWorkBasedOnId(item).subscribe({
            next: (art) => {
              this.arts.push(art.data);
              if(favorites.length - index == 1){
                this.isLoading = false;
              }
            },
            error: (err) => console.log(err),
          });
        });
      }else{
        this.empty = true;
        this.isLoading = false;
      }
    });
  }

  updateFavorites(event : string){
    this.isLoading = true;
    this.arts=[];
    this.getAllFavorites();
  }

  ngOnInit(): void {
    this.getAllFavorites();
  }
}
