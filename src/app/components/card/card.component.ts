import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ArtWork } from 'src/app/interfaces/art';
import { User } from 'src/app/interfaces/user';
import { ArtService } from 'src/app/services/art.ts.service';
import { UserService } from 'src/app/services/user.ts.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() art!: ArtWork;
  user!: User;
  isLoading: boolean = false;
  isFavorite: boolean = false;

  constructor(
    public artService: ArtService,
    private userService: UserService
  ) {}

  getUser() {
    this.userService
      .getUserById(sessionStorage.getItem('user') || '')
      .then((user) => {
        this.user = user;
        const found = (this.user.favorites as any).arrayValue.values?.find(
          (item: any) => parseInt(item.stringValue) == this.art.id
        );
        if (found) this.isFavorite = true;
        else this.isFavorite = false;
        // user.favorites.find(item => parseInt(item) == this.art.id);
      });
  }

  ngOnInit(): void {
    this.getUser();
  }

  loadImage() {
    this.isLoading = true;
    document
      .getElementById('card-img')
      ?.setAttribute(
        'src',
        this.artService.getImageBasedOnUrl(this.art.image_id)
      );
  }

  removeArtinFavorite() {
    const id = sessionStorage.getItem('user') as string;
    let favorites;
    if ((this.user.favorites as any).arrayValue) {
      favorites =
        (this.user.favorites as any).arrayValue.values?.map(
          (item: any) => item.stringValue
        ) || [];
    } else {
      favorites = this.user.favorites;
    }
    this.user.favorites = favorites.filter(
      (item: string) => parseInt(item) != this.art.id
    );
    this.userService
      .updateFavoritesInUser(id, this.user)
      .then(() => this.getUser())
      .catch((err) => console.log(err));
  }

  addArtInFavorite() {
    const id = sessionStorage.getItem('user') as string;
    let favorites;
    if ((this.user.favorites as any).arrayValue) {
      favorites =
        (this.user.favorites as any).arrayValue.values?.map(
          (item: any) => item.stringValue
        ) || [];
    } else {
      favorites = this.user.favorites;
    }
    if (favorites.length > 0) {
      this.user.favorites = [...favorites, String(this.art.id)];
    } else {
      this.user.favorites = [String(this.art.id)];
    }
    this.userService
      .updateFavoritesInUser(id, this.user)
      .then(() => this.getUser())
      .catch((err) => console.log(err));
  }
}
