import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ArtWork } from 'src/app/interfaces/art';
import { User } from 'src/app/interfaces/user';
import { ArtService } from 'src/app/services/art.ts.service';
import { UserService } from 'src/app/services/user.ts.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {
  @Input() art! : ArtWork;
  user! : User;
  @Output() updateFavorites : EventEmitter<string> = new EventEmitter<string>();

  constructor(public artService : ArtService , private userService : UserService){ }

  getUser() {
    this.userService
      .getUserById(sessionStorage.getItem('user') || '')
      .then((user) => {
        this.user = user;
      });
  }

  ngOnInit(): void {
    this.getUser();
  }

  removeFromFavorites(){
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
      .then(() => {
        this.getUser();
        this.updateFavorites.emit('removed');
      })
      .catch((err) => console.log(err));
  }
}
