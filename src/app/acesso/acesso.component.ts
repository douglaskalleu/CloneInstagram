import { animate, state, style, transition, trigger, keyframes } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

export const bannerAnimation = trigger('banner-animation', [
  state('created', style({
    opacity: 1
  })),
  transition('void => created', [
    style({
      opacity: 0,
      transform: 'translate(-50px, 0px)'
    }),
    animate('1.5s 0s ease-in-out')// duration delay aceleration
  ])
])

export const panelAnimation = trigger('panel-animation', [
  state('panelCreated', style({
    opacity: 1
  })),
  transition('void => panelCreated', [
    style({
      opacity: 0,
      transform: 'translate(50px, 0px)'
    }),
     //------------------------------------------
    animate('1.5s 0s ease-in-out', keyframes([
        style({ offset: 0.15, opacity: 1, transform: 'translateX(0)'}),
        style({ offset: 0.86, opacity:1, transform: 'translateX(0)' }),

        style({offset: 0.88, opacity: 1, transform: 'translateY(-10px)'}),
        style({offset: 0.90, opacity: 1, transform: 'translateY(10px)'}),
        style({offset: 0.92, opacity: 1, transform: 'translateY(-10px)'}),
        style({offset: 0.94, opacity: 1, transform: 'translateY(10px)'}),
        style({offset: 0.96, opacity: 1, transform: 'translateY(-10px)'}),
        style({offset: 0.98, opacity: 1, transform: 'translateY(10px)'}),
        
        style({offset: 1,  opacity: 1, transform: 'translateY(0)' })
    ])) // duration delay easing
  ])
])

@Component({
  selector: 'app-acesso',
  templateUrl: './acesso.component.html',
  styleUrls: ['./acesso.component.css'],
  animations: [
    bannerAnimation,
    panelAnimation
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

  public beginAnimation(): void{
    
  }

  public endAnimation(): void{
    
  }
}
