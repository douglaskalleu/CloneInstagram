import { Component, OnInit } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'clone-instagram';

  ngOnInit(): void {

    // Here you put the config to use firebase
    const firebaseConfig = {
      apiKey: "AIzaSyCqdSRWKTrtw32qtSWvlRG5I32nbkfxeHo",
      authDomain: "jta-instagram-clone-6d950.firebaseapp.com",
      projectId: "jta-instagram-clone-6d950",
      databaseURL: "https://jta-instagram-clone-6d950-default-rtdb.firebaseio.com/",
      storageBucket: "jta-instagram-clone-6d950.appspot.com",
      messagingSenderId: "722934271597",
      appId: "1:722934271597:web:fba8859928fa6392367964",
      measurementId: "G-R6GHQ04B21"
    }
    
    firebase.initializeApp(firebaseConfig);
  }
}