import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  mostrarLogin = true;
  mostrarRegistro = false;

  mostrarFormularioLogin() {
    this.mostrarLogin = true;
    this.mostrarRegistro = false;
  }

  mostrarFormularioRegistro() {
    this.mostrarLogin = false;
    this.mostrarRegistro = true;
  }

  cambiarFormulario(value: string) {
    if (value === 'login') {
      this.mostrarFormularioLogin();
    } else if (value === 'registro') {
      this.mostrarFormularioRegistro();
    }
  }

}
