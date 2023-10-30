import { Component, OnInit } from '@angular/core';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(private fireStore: Firestore) {}

  addData(f: any) {
    // console.log(f.value);
      const collectionInstance = collection(this.fireStore, 'users');
      addDoc(collectionInstance, f.value).then(
        () => console.log("DATA SAVED!")
      ).catch(err => console.log(err));
  }

  getData(){
    const collectionInstance = collection(this.fireStore, 'users');
    collectionData(collectionInstance).subscribe(
      val => console.log(val)
    )
  }

  ngOnInit(): void {
    this.getData();
  }

}
