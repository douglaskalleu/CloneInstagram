import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Image } from './imagem.model';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
  animations: [
    trigger('banner', [
      state('hidded', style({
        opacity: 0
      })),
      state('visible', style({
        opacity: 1
      })),
      transition('hidded <=> visible', animate('1s ease-in'))
    ])
  ]
})

export class BannerComponent implements OnInit {
  public state: string = 'hidded';
  public images: Image[] = [
    { state: 'visible', url: '/assets/banner-acesso/img_1.png' },
    { state: 'hidded', url: '/assets/banner-acesso/img_2.png' },
    { state: 'hidded', url: '/assets/banner-acesso/img_3.png' },
    { state: 'hidded', url: '/assets/banner-acesso/img_4.png' },
    { state: 'hidded', url: '/assets/banner-acesso/img_5.png' },
  ]

  constructor() {}

  ngOnInit(): void {
    setTimeout(() => this.logicalRotate(), 3000);
  }

  public logicalRotate() :void{
    let indexImg: number = 0;

    for(let i:number = 0; i <= 4; i++){
        if(this.images[i].state === 'visible'){
          this.images[i].state = 'hidded';
          indexImg = i === 4 ? 0 : i + 1;
          break;
        }
    }

    this.images[indexImg].state = 'visible';
    setTimeout(() => this.logicalRotate(), 3000);
  }
}
