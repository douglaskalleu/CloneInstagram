import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-publication',
  templateUrl: './add-publication.component.html',
  styleUrls: ['./add-publication.component.css']
})
export class AddPublicationComponent {
  public form: FormGroup = new FormGroup({
    'title': new FormControl(null)
  })

  public publish(): void{
    console.log("Aqui será publicado no feed")
  }
}
