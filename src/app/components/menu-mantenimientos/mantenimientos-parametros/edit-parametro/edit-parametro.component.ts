import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-parametro',
  templateUrl: './edit-parametro.component.html',
  styleUrls: ['./edit-parametro.component.css']
})
export class EditParametroComponent {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditParametroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

        // Si se inserta un registro nuevo se crea un formulario vacio
    if (data == null){
        this.form = this.fb.group({
          tipo: [null], 
          codigo: [null], 
          descripcion: [null, Validators.required],
          descripcionValenciano: [null, Validators.required],
          activo: [null, Validators.required]
          // Agrega más controles aquí para las otras propiedades de la receta
        });
  
  
      }else{
        // Si se edita un registro se crea un formulario con los datos del registro.
        this.form = this.fb.group({
            tipo: [data.parametro.tipo], 
            codigo: [data.parametro.codigo], 
            descripcion: [data.parametro.descripcion, Validators.required],
            descripcionValenciano: [data.parametro.descripcionValenciano, Validators.required],
            activo: [data.parametro.activo, Validators.required],
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