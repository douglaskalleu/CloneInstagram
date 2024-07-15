import { Component, Inject, Renderer2, RendererFactory2 } from '@angular/core';
import { Auth } from '../auth.service';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  codeName: string = 'theme-service'
  public isDarkTheme: boolean = false;
  private _renderer: Renderer2;
  constructor(private auth: Auth, @Inject(DOCUMENT) private _document: Document,
  rendererFactory: RendererFactory2 ) {
    this._renderer = rendererFactory.createRenderer(null, null);}

    _isDarkTheme: boolean = false;
  get isDarkMode() {
		return this._isDarkTheme;
	}

  public logoff(): void{
    this.auth.logoff();
  }

  changeTheme(theme: boolean) : number
  {

    // const body=document.body as HTMLElement
    // console.log('2', theme);
    // body.setAttribute('data-bs-theme', theme)
    return this.switchTheme(theme)
  }

  switchTheme(isDark: boolean): number {
		const _themeLink = this._document.getElementById('app-theme') as HTMLLinkElement;
		if (_themeLink) {
			// change the <link id="app-theme" rel="stylesheet" ... 
			const _theme = isDark ? 'dark' : 'light';
			//const _link = `${this._folder}/${this._rootTheme}-${_theme}-${this._rootColor}/theme.css`;
			//_themeLink.href = _link;
			this._isDarkTheme = isDark;
			// additionally set 'data-bs-theme' to the theme color
			const _colorTheme = this._document.getElementById('body-color-theme');
			if( _colorTheme !== null ) {
				this._renderer.setAttribute( _colorTheme, 'data-bs-theme', _theme );
				console.log( `${this.codeName}: New color theme: ${_theme}` );
				return 0;
			}
			console.warn( `${this.codeName}: Failed to find: 'body-color-theme'` );
			return 1;
		}
		//console.warn( `${this.codeName}: Failed to find: 'app-theme'` );
		return 2;
	}
}
