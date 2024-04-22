import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-ejercicio',
  templateUrl: './edit-ejercicio.component.html',
  styleUrls: ['./edit-ejercicio.component.css']
})
export class EditEjercicioComponent {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditEjercicioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

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
          material: [null]
          // Agrega más controles aquí para las otras propiedades de la receta
        });
  
  
      }else{
        // Si se edita un registro se crea un formulario con los datos del registro.
        this.form = this.fb.group({
            id: [null], 
            nombre: [null, Validators.required],
            objetivo: [null, Validators.required],
            nivel: [null, Validators.required],
            duracion: [null, Validators.required],
            grupoMuscular: [null],
            deporte: [null],
            material: [null]
            // Agrega más controles aquí para las otras propiedades de la receta
          });
      }
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.form.valid) {
      //TODO: Aqui se añadira la llamada al guardado de la receta en la base de datos.
      this.dialogRef.close(this.form.value);
    }
  }

}