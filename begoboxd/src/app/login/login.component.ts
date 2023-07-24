import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username!: string;
  password!: string;

  onSubmit() {
    console.log('Username: ' + this.username);
    console.log('Password: ' + this.password);
  }

}
