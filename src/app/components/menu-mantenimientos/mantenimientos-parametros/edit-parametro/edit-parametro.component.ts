import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TiposVO } from 'src/app/interfaces/tipos.interface';
import { ParametrosService } from 'src/app/services/parametros.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { TiposService } from 'src/app/services/tipos.service';

@Component({
  selector: 'app-edit-parametro',
  templateUrl: './edit-parametro.component.html',
  styleUrls: ['./edit-parametro.component.css']
})
export class EditParametroComponent {

  form: FormGroup;
  isReadOnly: boolean = true;
  tipoOptions: TiposVO[] = [];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditParametroComponent>,
    private tiposService: TiposService,
    private parametrosService: ParametrosService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackbarService: SnackbarService) {

      tiposService.getTipos().subscribe(data => {
        this.tipoOptions = data;
      });

        // Si se inserta un registro nuevo se crea un formulario vacio
    if (data == null){
        this.form = this.fb.group({
          tipo: [null, [Validators.required, Validators.maxLength(100)]], 
          codigo: [null, [Validators.required, Validators.maxLength(20)]], 
          descripcion: [null, [Validators.required, Validators.maxLength(1000)]],
          descripcionV: [null, [Validators.required, Validators.maxLength(1000)]],
          activo: [null, [Validators.required, Validators.maxLength(1)]]
        });
        this.isReadOnly= false;
  
  
      }else{
        // Si se edita un registro se crea un formulario con los datos del registro.
          this.form = this.fb.group({
            tipo: [data.parametro.tipo], 
            codigo: [data.parametro.codigo], 
            descripcion: [data.parametro.descripcion,[Validators.required, Validators.maxLength(1000)]],
            descripcionV: [data.parametro.descripcionV,[Validators.required, Validators.maxLength(1000)]],
            activo: [data.parametro.activo,[Validators.required, Validators.maxLength(1)]],
          });
      }
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.form.valid) {
      this.parametrosService.save(this.form.value).subscribe(data => {
        this.dialogRef.close(this.form.value);
        this.snackbarService.openSnackBar('Guardado correctamente');
      });
    }
  }

}