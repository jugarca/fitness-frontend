import { Component } from '@angular/core';
import { RandomUserService } from '../../services/random-user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-usuario-perfil',
  templateUrl: './usuario-perfil.component.html',
  styleUrls: ['./usuario-perfil.component.css']
})
export class UsuarioPerfilComponent {

  public fotoPerfil!: string;
  public formUser!: FormGroup;

  constructor(private fb: FormBuilder, private randomUserService: RandomUserService,
              private usuariosService: UsuariosService){

    this.randomUserService.getUser().subscribe((data: any) => {
      console.log(data);
      this.fotoPerfil= data.results[0].picture.large;
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

  
    this.usuariosService.getById(2).subscribe((data: any) => {
      this.formUser = this.fb.group({
        nombre: [data.nombre],
        email: [data.email],
        edad: [data.edad],
        altura: [data.altura],
        peso: [data.peso],
        nivelPersonalizado: [data.nivelPersonalizado],
        tiempoEntrenamiento: [data.tiempoEntrenamiento],
        objetivoEntrenamiento: [data.objetivoEntrenamiento],
        grupoMuscular: [data.grupoMuscular],
        kilocaloriasMaximas: [data.kilocaloriasMaximas],
        tipoAlimentacion: [data.tipoAlimentacion]
      });
    });

  }

  onSave(){
    alert("Guardado correctamente");
  }

}
