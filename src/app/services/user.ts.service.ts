import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Observable, Subject } from 'rxjs';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  collectionSnapshots,
  getDoc,
  getFirestore,
  updateDoc,
} from '@angular/fire/firestore';
import { doc } from '@firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user!: User;
  constructor(private fireStore: Firestore) {}
  addNameSubject = new Subject<User>()
  addName(user : User){
    this.addNameSubject.next(user)
  }
  addUser(user : User) {
    const collectionInstance = collection(this.fireStore, 'users');
    addDoc(collectionInstance, user)
      .catch((err) => console.log(err));
  }

  async getUserById(id : string) : Promise<User>{
    const db = getFirestore();
    const docRef = doc(db, 'users', id);
    const user : any = await getDoc(docRef)
    return user._document.data.value.mapValue.fields as User;
  }

  getUsers(): Observable<User[]> {
    const collectionInstance = collection(this.fireStore, 'users');
    collectionData(collectionInstance);
    return collectionData(collectionInstance, {
      idField: 'id',
    }) as Observable<User[]>;
  }

  updateFavoritesInUser(id : string , user : User) : Promise<any>{
    const docInstance = doc(this.fireStore , 'users',id);
    return updateDoc(docInstance , {
      favorites : user.favorites
    });
  }
}
