import { Component, ViewChild } from '@angular/core';
import { Auth } from '../auth.service';
import { ThemeService } from '../toggle-theme/theme.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  @ViewChild('publication') public publication: any
  constructor(private auth: Auth, private themeService: ThemeService) {}

  public logoff(): void{
    this.auth.logoff();
  }
  
  get isDarkMode() {
		return this.themeService.isDarkTheme;
	}

  public refreshTimeLine(): void{
    this.publication.getPublish();
  }
}
