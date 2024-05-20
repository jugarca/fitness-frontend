import { Component, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { TiposVO } from 'src/app/interfaces/tipos.interface';
import { ParametrosService } from 'src/app/services/parametros.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-edit-usuario',
  templateUrl: './edit-usuario.component.html',
  styleUrls: ['./edit-usuario.component.css']
})
export class EditUsuarioComponent {

  form: FormGroup;

  public tiposNivel: TiposVO[] = [];
  public tiposObjetivo: TiposVO[] = [];
  public tiposTiempo: TiposVO[] = [];
  public tiposRole: TiposVO[] = [];
  @ViewChild(MatTable) tabla!: MatTable<any>;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditUsuarioComponent>,
    private usuariosService: UsuariosService,
    private parametrosService: ParametrosService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackbarService: SnackbarService
  ) {

    this.parametrosService.getByTipo('NIVEL').subscribe(data => {
      this.tiposNivel = data;
    });
    this.parametrosService.getByTipo('ROLE').subscribe(data => {
      this.tiposRole = data;
    });
    this.parametrosService.getByTipo('OBJETIVO').subscribe(data => {
      this.tiposObjetivo = data;
    });
    this.parametrosService.getByTipo('TIEMPO').subscribe(data => {
      this.tiposTiempo = data;
    });


    // Si se inserta un registro nuevo se crea un formulario vacio
    if (data == null){
      this.form = this.fb.group({
        id: [null], 
        nombre: [null, Validators.required],
        email: [null, Validators.required],
        role: [null, Validators.required],
        edad: [null, Validators.required],
        altura: [null],
        peso: [null],
        nivelPersonalizado: [null],
        tiempoEntrenamiento: [null],
        objetivoEntrenamiento: [null],
        // Agrega más controles aquí para las otras propiedades de la receta
      });

    }else{
      // Si se edita un registro se crea un formulario con los datos del registro.
      this.form = this.fb.group({
        id: [data.usuario.id], 
        nombre: [data.usuario.nombre, Validators.required],
        email: [data.usuario.email, [Validators.required, Validators.email]],
        role: [data.usuario.role, Validators.required],
        edad: [data.usuario.edad, Validators.required],
        altura: [data.usuario.altura],
        peso: [data.usuario.peso],
        nivelPersonalizado: [data.usuario.nivelPersonalizado],
        tiempoEntrenamiento: [data.usuario.tiempoEntrenamiento],
        objetivoEntrenamiento: [data.usuario.objetivoEntrenamiento],
        // Agrega más controles aquí para las otras propiedades de la receta
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.form.valid) {
      this.usuariosService.save(this.form.value).subscribe(data => {
        this.dialogRef.close(this.form.value);
        this.snackbarService.openSnackBar('Guardado correctamente');
      });
    }
  }

}
