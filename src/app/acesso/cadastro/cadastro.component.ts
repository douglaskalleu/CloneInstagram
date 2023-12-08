import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  @Output() public showPanel: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit(): void {
  }

  public showLogin():void{
    this.showPanel.emit('login');
  }

}
