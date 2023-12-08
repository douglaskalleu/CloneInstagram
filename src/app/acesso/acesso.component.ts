import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-acesso',
  templateUrl: './acesso.component.html',
  styleUrls: ['./acesso.component.css'],
  animations: [
    trigger('banner-animation', [
      state('created', style({
        opacity: 1
      })),
      transition('void => created', [
        style({
          opacity: 0,
          transform: 'translate(-50px, 0px)'
        }),
        animate('500ms 0s ease-in-out') // duration delay aceleration
      ])
    ]),
    trigger('panel-animation', [
      state('panelCreated', style({
        opacity: 1
      })),
      transition('void => panelCreated', [
        style({
          opacity: 0,
          transform: 'translate(50px, 0px)'
        }),
        animate('500ms 0s ease-in-out') // duration delay aceleration
      ])
    ])
  ]
})
export class AcessoComponent implements OnInit{

  public bannerState: string = 'created';
  public panelState: string = 'panelCreated';

  public register: boolean = false;
  
  ngOnInit(): void {
  }

  public showPanel(event: string): void{
    this.register = event === 'register' ? true : false;
  }
}
