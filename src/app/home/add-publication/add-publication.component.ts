import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as firebase from "firebase/auth";
import { Bd } from 'src/app/bdServices/bd.service';

@Component({
  selector: 'app-add-publication',
  templateUrl: './add-publication.component.html',
  styleUrls: ['./add-publication.component.css']
})
export class AddPublicationComponent {

  constructor(
    private bd: Bd
  ){ }

  public email: string | undefined;

  public form: FormGroup = new FormGroup({
    'title': new FormControl(null)
  })

  ngOnInit(){
    firebase.getAuth().onAuthStateChanged((user) => {
      this.email = user?.email!;
    });
  }

  public publish(): void{
    this.bd.publish({
      email: this.email,
      title: this.form.value.title
    });
  }

  public prepareUploadImage(event: Event): void{
    console.log((<HTMLInputElement>event.target).files);
  }
}
