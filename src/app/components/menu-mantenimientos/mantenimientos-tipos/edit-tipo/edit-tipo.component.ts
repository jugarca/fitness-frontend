import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { TiposService } from 'src/app/services/tipos.service';

@Component({
  selector: 'app-edit-tipo',
  templateUrl: './edit-tipo.component.html',
  styleUrls: ['./edit-tipo.component.css']
})
export class EditTipoComponent {

  form: FormGroup;
  isReadOnly: boolean = true; 

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditTipoComponent>,
    private tiposService: TiposService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackbarService: SnackbarService) {

        // Si se inserta un registro nuevo se crea un formulario vacio
    if (data == null){
        this.form = this.fb.group({
          codigo: [null, [Validators.required, Validators.maxLength(10)]], 
          descripcion: [null, [Validators.required, Validators.maxLength(1000)]],
          descripcionValenciano: [null, [Validators.required, Validators.maxLength(1000)]],
          activo: [null, [Validators.required]]
          // Agrega más controles aquí para las otras propiedades de la receta
        });
        this.isReadOnly = false;
        
      } else {
        // Si se edita un registro se crea un formulario con los datos del registro.
        this.form = this.fb.group({
            codigo: [data.tipo.codigo,[Validators.required, Validators.maxLength(10)]], 
            descripcion: [data.tipo.descripcion, [Validators.required, Validators.maxLength(1000)]],
            descripcionValenciano: [data.tipo.descripcionValenciano, [Validators.required, Validators.maxLength(1000)]],
            activo: [data.tipo.activo, [Validators.required, Validators.maxLength(1)]],
            // Agrega más controles aquí para las otras propiedades de la receta
          });
      }
    }

  cancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.form.valid) {
      //TODO: Aqui se añadira la llamada al guardado de la receta en la base de datos.
      this.tiposService.save(this.form.value).subscribe(data => {
        this.dialogRef.close(this.form.value);
        this.snackbarService.openSnackBar('Guardado correctamente');
      });
    }
  }

}