import { Component } from '@angular/core';
import { Auth } from '../auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private auth: Auth){}

  public logoff(): void{
    this.auth.logoff();
  }
}
