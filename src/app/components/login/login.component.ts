import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { TranslocoService } from '@ngneat/transloco';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/components/dialog.component';

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
  errorMessageRegistro?: string;

  constructor(private userService: UsuariosService, fb: FormBuilder, private router: Router,
    private translocoService: TranslocoService, public dialog: MatDialog) {
    this.registro = fb.group({
      email: [null,[Validators.required, Validators.email]],
      password: [null,[Validators.required]],
      nombre: [null,[Validators.required]],
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
      this.dialog.open(DialogComponent, {
        data: {
          message: 'Debe aceptar los terminos y condiciones para registrarse.'
        }
      });
      return;
    }
    this.userService.registro(this.registro.value).subscribe( ()=>{
      if (this.errorMessageRegistro) {
        this.errorMessageRegistro = this.translocoService.translate('error.registro');
      }else{
        //TODO: Sacar una alerta por dialog
        this.dialog.open(DialogComponent, {
          data: {
            message: 'Usuario registrado correctamente'
          }
        });
      }   
    });
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
        this.errorMessage = this.translocoService.translate('error.login');
      }
    );
  }

}
