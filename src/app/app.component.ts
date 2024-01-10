import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';

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
      
    }
    
    firebase.initializeApp(firebaseConfig);
  }
}
