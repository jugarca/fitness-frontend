import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TiposVO } from 'src/app/interfaces/tipos.interface';
import { EjerciciosService } from 'src/app/services/ejercicios.service';
import { ParametrosService } from 'src/app/services/parametros.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-edit-ejercicio',
  templateUrl: './edit-ejercicio.component.html',
  styleUrls: ['./edit-ejercicio.component.css']
})
export class EditEjercicioComponent {

  form: FormGroup;

  public tiposNivel: TiposVO[] = [];
  public tiposObjetivo: TiposVO[] = [];
  public tiposGrupoMuscular: TiposVO[] = [];
  public tiposTiempos: TiposVO[] = [];
  public tiposDeporte: TiposVO[] = [];
  public tiposMaterial: TiposVO[] = [];

  constructor(
    private fb: FormBuilder,
    private ejerciciosService: EjerciciosService,
    private parametrosService: ParametrosService, 
    public dialogRef: MatDialogRef<EditEjercicioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackbarService: SnackbarService) {

    this.parametrosService.getByTipo('NIVEL').subscribe(data => {
      this.tiposNivel = data;
    });

    this.parametrosService.getByTipo('OBJETIVO').subscribe(data => {
      this.tiposObjetivo = data;
    });

    this.parametrosService.getByTipo('TIEMPO').subscribe(data => {
      this.tiposTiempos = data;
    });

    this.parametrosService.getByTipo('DEPORTE').subscribe(data => {
      this.tiposDeporte = data;
    });

    this.parametrosService.getByTipo('GRUPMUS').subscribe(data => {
      this.tiposGrupoMuscular = data;
    });

    this.parametrosService.getByTipo('MATERIAL').subscribe(data => {
      this.tiposMaterial = data;
    });

        // Si se inserta un registro nuevo se crea un formulario vacio
    if (data == null){
        this.form = this.fb.group({
          id: [null], 
          nombre: [null, Validators.required],
          objetivo: [null, Validators.required],
          nivel: [null, Validators.required],
          duracion: [null, Validators.required],
          grupoMuscular: [null],
          deporte: [null],
          material: [null],
          imagen: [null, Validators.required]
          // Agrega más controles aquí para las otras propiedades de la receta
        });
  
  
      }else{
        // Si se edita un registro se crea un formulario con los datos del registro.
        this.form = this.fb.group({
            id: [data.ejercicio.id], 
            nombre: [data.ejercicio.nombre, Validators.required],
            objetivo: [data.ejercicio.objetivo, Validators.required],
            nivel: [data.ejercicio.nivel, Validators.required],
            duracion: [data.ejercicio.duracion.toString(), Validators.required],
            grupoMuscular: [data.ejercicio.grupoMuscular],
            deporte: [data.ejercicio.deporte],
            material: [data.ejercicio.material],
            imagen: [data.ejercicio.imagen, Validators.required]
            // Agrega más controles aquí para las otras propiedades de la receta
          });
      }
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.form.valid) {
      this.ejerciciosService.save(this.form.value).subscribe(data => {
        this.dialogRef.close(this.form.value);
        this.snackbarService.openSnackBar('Guardado correctamente');
      });
    }
  }

}