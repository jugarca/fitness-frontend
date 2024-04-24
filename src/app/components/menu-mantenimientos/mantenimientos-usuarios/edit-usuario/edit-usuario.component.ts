import { Component, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-edit-usuario',
  templateUrl: './edit-usuario.component.html',
  styleUrls: ['./edit-usuario.component.css']
})
export class EditUsuarioComponent {

  form: FormGroup;

  @ViewChild(MatTable) tabla!: MatTable<any>;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {


    // Si se inserta un registro nuevo se crea un formulario vacio
    if (data == null){
      this.form = this.fb.group({
        id: [null], 
        nombre: [null, Validators.required],
        email: [null, Validators.required],
        rol: [null, Validators.required],
        edad: [null, Validators.required],
        altura: [null],
        peso: [null],
        nivel: [null],
        tiempo: [null],
        objetivo: [null],
        // Agrega más controles aquí para las otras propiedades de la receta
      });

    }else{
      // Si se edita un registro se crea un formulario con los datos del registro.
      this.form = this.fb.group({
        id: [data.usuario.id], 
        nombre: [data.usuario.nombre, Validators.required],
        email: [data.usuario.email, Validators.required],
        rol: [data.usuario.rol, Validators.required],
        edad: [data.usuario.edad, Validators.required],
        altura: [data.usuario.altura],
        peso: [data.usuario.peso],
        nivel: [data.usuario.nivel],
        tiempo: [data.usuario.tiempo],
        objetivo: [data.usuario.objetivo],
        // Agrega más controles aquí para las otras propiedades de la receta
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.form.valid) {
      //TODO: Aqui se añadira la llamada al guardado de la receta en la base de datos.
      this.dialogRef.close(this.form.value);
    }
  }

//Agregar los metodos relacionados con la tabla de ingredientes

editarIngrediente(idIngrediente: number): void {
  // Aquí puedes agregar el código para editar el ingrediente
}

borrarIngrediente(idIngrediente: number): void {
  // Aquí puedes agregar el código para borrar el ingrediente
}

}
