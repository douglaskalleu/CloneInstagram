import { Component } from '@angular/core';
import { Bd } from '../../bdServices/bd.service';
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import { FireDataBase } from 'src/app/bdServices/bd-firedatabase';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent {

  public email: string = '';
  public publications: any;
  public fire :FireDataBase = new FireDataBase();
  
  constructor(){ }

  ngOnInit(){
    this.getPublish();
  }

  public getPublish(): void{
    firebase.auth().onAuthStateChanged((user) => {
        this.fire.getPublish(user?.email!)
        .then((publish: any) => {
            this.publications = publish
        });
    });    
  }
}