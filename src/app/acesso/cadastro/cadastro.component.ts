import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { User } from '../user.model';
import { Auth } from '../../auth.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  @Output() public showPanel: EventEmitter<string> = new EventEmitter<string>();

  public form: FormGroup = new FormGroup({
    'email': new FormControl(null),
    'all_name': new FormControl(null),
    'user_name': new FormControl(null),
    'password': new FormControl(null),
  });

  constructor(
    private auth: Auth
  ) {}

  ngOnInit(): void {
  }

  public showLogin():void{
    this.showPanel.emit('login');
  }

  public registerUser(): void{
    let user: User = new User (
      this.form.value.email,
      this.form.value.all_name,
      this.form.value.user_name,
      this.form.value.password
    );

    this.auth.registerUser(user)
    .then(() => this.showLogin());
  }
}
