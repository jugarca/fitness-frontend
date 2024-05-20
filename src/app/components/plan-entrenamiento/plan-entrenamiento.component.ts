import { Component } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-plan-entrenamiento',
  templateUrl: './plan-entrenamiento.component.html',
  styleUrls: ['./plan-entrenamiento.component.css']
})
export class PlanEntrenamientoComponent {

  usuario!: User;

  constructor(private usuariosService: UsuariosService) { 
    this.usuariosService.getById(Number(sessionStorage.getItem('id'))).subscribe((data: any) => {
      console.log(data);
      
      this.usuario = data;
    });
  }

}
