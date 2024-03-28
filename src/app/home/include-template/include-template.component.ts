import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-include-template',
  templateUrl: './include-template.component.html',
  styleUrls: ['./include-template.component.css']
})
export class IncludeTemplateComponent {
  public form: FormGroup = new FormGroup({
    'title': new FormControl(null)
  })

  public publish(): void{
    console.log("Aqui será publicado no feed")
  }
}
