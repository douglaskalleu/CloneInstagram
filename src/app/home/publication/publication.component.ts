import { Component } from '@angular/core';
import { Bd } from '../../bdServices/bd.service';
@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent {

  public email: string = '';
  public publications: any;
  constructor(private bd: Bd){ }

  ngOnInit(){
    this.bd.getPublish();
  }
}
