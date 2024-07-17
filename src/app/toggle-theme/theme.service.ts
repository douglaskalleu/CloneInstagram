import { Inject, Injectable, Renderer2, RendererFactory2  } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
	providedIn: 'root',
})
export class ThemeService {
    
	codeName: string = 'theme-service';
	private _renderer: Renderer2;
	_folder: string = '/assets/themes';
	_rootTheme: string = 'lara';
	_rootColor: string = 'blue';
	
	_isDarkTheme: boolean = false;
	get isDarkTheme(): boolean {
		return this._isDarkTheme;
	}
    
	constructor(
		@Inject(DOCUMENT) private _document: Document,
		rendererFactory: RendererFactory2 ) {
			this._renderer = rendererFactory.createRenderer(null, null);
	}
    
	switchTheme(isDark: boolean): number {
		const _themeLink = this._document.getElementById('app-theme') as HTMLLinkElement;
		if (_themeLink) {
            
			const _theme = isDark ? 'dark' : 'light';
			const _link = `${this._folder}/${this._rootTheme}-${_theme}-${this._rootColor}/theme.css`;
			_themeLink.href = _link;
			this._isDarkTheme = isDark;
			const _colorTheme = this._document.getElementById('body-color-theme');
			if( _colorTheme !== null ) {
				this._renderer.setAttribute( _colorTheme, 'data-bs-theme', _theme );
				console.log( `${this.codeName}: New color theme: ${_theme}` );
				return 0;
			}
			console.warn( `${this.codeName}: Failed to find: 'body-color-theme'` );
			return 1;
		}
		console.warn( `${this.codeName}: Failed to find: 'app-theme'` );
		return 2;
	}
}
