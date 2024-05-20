import { Component } from '@angular/core';
import { RandomUserService } from '../../services/random-user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { TiposVO } from 'src/app/interfaces/tipos.interface';
import { ParametrosService } from 'src/app/services/parametros.service';
import { grupoMuscular } from '../estadisticas/dataGrupoMuscular';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from 'src/app/shared/services/dialog.service';

@Component({
  selector: 'app-usuario-perfil',
  templateUrl: './usuario-perfil.component.html',
  styleUrls: ['./usuario-perfil.component.css']
})
export class UsuarioPerfilComponent {

  public fotoPerfil!: string;
  public formUser!: FormGroup;
  public tiposNivel: TiposVO[] = [];
  public tiposObjetivo: TiposVO[] = [];
  public tiposTiempo: TiposVO[] = [];
  public tiposAlimentacion: TiposVO[] = [];
  public tiposGruposMusculares: TiposVO[] = [];

  constructor(private fb: FormBuilder, private randomUserService: RandomUserService,
              private usuariosService: UsuariosService, private parametrosService: ParametrosService,
              private snackBar: MatSnackBar){

    this.randomUserService.getUser().subscribe((data: any) => {
      this.fotoPerfil= data.results[0].picture.large;
    });

    //1. Se cargan las lista que se van a usar en el formulario
    this.parametrosService.getByTipo('NIVEL').subscribe(data => {
      this.tiposNivel = data;
    });
    this.parametrosService.getByTipo('TALIME').subscribe(data => {
      this.tiposAlimentacion = data;
    });
    this.parametrosService.getByTipo('OBJETIVO').subscribe(data => {
      this.tiposObjetivo = data;
    });
    this.parametrosService.getByTipo('TIEMPO').subscribe(data => {
      this.tiposTiempo = data;
    });
    this.parametrosService.getByTipo('GRUPMUS').subscribe(data => {
      this.tiposGruposMusculares = data;
    });

    this.formUser = this.fb.group({
      nombre: "", 
      email:"",
      edad:"",
      altura:"",
      peso:"",
      nivelPersonalizado:"",
      tiempoEntrenamiento:"",
      objetivoEntrenamiento:"",
      grupoMuscular:"",
      kilocaloriasMaximas:"",
      tipoAlimentacion:"",});

  
    this.usuariosService.getById(Number(sessionStorage.getItem('id'))).subscribe((data: any) => {
      this.formUser = this.fb.group({
        id: sessionStorage.getItem('id'),
        nombre: [data.nombre,[Validators.required, Validators.maxLength(50)]],
        email: [data.email,[Validators.required, Validators.maxLength(150)]],
        edad: [data.edad,[Validators.required, Validators.max(105)]],
        altura: [data.altura,[Validators.required, Validators.max(300)]],
        peso: [data.peso,[Validators.required, Validators.max(500)]],
        nivelPersonalizado: [data.nivelPersonalizado],
        tiempoEntrenamiento: [data.tiempoEntrenamiento],
        objetivoEntrenamiento: [data.objetivoEntrenamiento],
        grupoMuscular: [data.grupoMuscular],
        kilocaloriasMaximas: [data.kilocaloriasMaximas],
        tipoAlimentacion: [data.tipoAlimentacion],
        role: "BASICO"
      });
    });

  }

  onSave(){
    if (this.formUser.valid) {
      this.usuariosService.save(this.formUser.value).subscribe(data => {
        this.snackBar.open('Guardado correctamente', 'Cerrar', {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'end',
        });
      });
    }
  }

}
