import { Component, OnInit } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  collectionSnapshots,
  getDoc,
  getFirestore,
} from '@angular/fire/firestore';
import { doc } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { USer } from 'src/app/interfaces/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(private fireStore: Firestore) {}
  users!: Observable<USer[]>;
  addData(f: any) {
    const collectionInstance = collection(this.fireStore, 'users');
    addDoc(collectionInstance, f.value)
      .then(() => console.log('DATA SAVED!'))
      .catch((err) => console.log(err));
  }

  getData() {
    const collectionInstance = collection(this.fireStore, 'users');
    collectionData(collectionInstance).subscribe((val) => console.log(val));
    this.users = collectionData(collectionInstance, {
      idField: 'id',
    }) as Observable<USer[]>;

    const db = getFirestore();
    const docRef = doc(db, 'users', 'GcosDTeJncOYdj5eaY0Y');
    getDoc(docRef).then((user) => console.log(user));
  }

  ngOnInit(): void {
    this.getData();
  }
}
