import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  mostrarLogin = true;
  mostrarRegistro = false;
  registro!: FormGroup;
  loginUsuario!: FormGroup;
  errorMessage?: string;

  constructor(private userService: UsuariosService, fb: FormBuilder, private router: Router) {
    this.registro = fb.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required]],
      nombre: ['',[Validators.required]],
      terminos:[false],
    });

    this.loginUsuario = fb.group({
      nombre: ['',[Validators.required]],
      password: ['',[Validators.required]],
    });

  }

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

  registrarse(){
    if (this.registro.controls['terminos'].value === false) {
      //TODO: Sustituir alerta por dialog.
      alert('Debes aceptar los términos y condiciones');
      return;
    }
    this.userService.registro(this.registro.value).subscribe( ()=>{
      //TODO: Sacar una alerta por dialog
      alert('Usuario registrado correctamente');
    } );
  }

  login(){
    this.userService.login(this.loginUsuario.value).subscribe(
      data => {
        sessionStorage.setItem('id', data.id);
        sessionStorage.setItem('role', data.role);
        sessionStorage.setItem('nombre', data.nombre);
        this.router.navigate(['/pantallaPrincipal']);
      },
      error => {
        console.error('Error en el login:', error);
        this.errorMessage = 'Usuario o contraseña incorrectos';
      }
    );
  }

}
