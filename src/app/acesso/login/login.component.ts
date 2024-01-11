import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Auth } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() public showPanel: EventEmitter<string> = new EventEmitter<string>();

  public form: FormGroup = new FormGroup({
    'email': new FormControl(null),
    'password': new FormControl(null)
  });

  constructor(
    private auth: Auth
  ){}

  ngOnInit(): void {
  }

  public showPanelRegister(): void{
    this.showPanel.emit('register');
  }

  public AuthOnInstagram(): void{
   this.auth.AuthOnInstagram(this.form.value.email, this.form.value.password);
  }

}
