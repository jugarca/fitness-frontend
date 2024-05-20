import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TiposVO } from 'src/app/interfaces/tipos.interface';
import { ValoresTipoVO } from 'src/app/interfaces/valoresTipos.interface';
import { EjerciciosUsuariosService } from 'src/app/services/ejercicios-usuario.service';
import { ParametrosService } from 'src/app/services/parametros.service';
import { TiposService } from 'src/app/services/tipos.service';

@Component({
  selector: 'app-modal-estado-ejercicio',
  templateUrl: './modal-estado-ejercicio.component.html',
  styleUrls: ['./modal-estado-ejercicio.component.css']
})
export class ModalEstadoEjercicioComponent {

  isReadOnly: boolean = true;
  estadoEjercicio: ValoresTipoVO[] = [];
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModalEstadoEjercicioComponent>,
    private parametrosService: ParametrosService,
    private ejerciciosUsuariosService: EjerciciosUsuariosService,
    @Inject(MAT_DIALOG_DATA) public data: any) {

      this.parametrosService.getByTipo('ESTADO').subscribe(data => {
        this.estadoEjercicio = data;
      });

      this.form = fb.group({
        codigo: [data.ejercicio.codigo],
        estado: [data.ejercicio.estado]
      });

      console.log(data);
    
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.form.valid) {
      console.log(this.form.value);
      this.ejerciciosUsuariosService.saveEstado(this.form.value).subscribe( (data) => { 
        console.log(data);
      });
    }
    this.dialogRef.close();
  }

}