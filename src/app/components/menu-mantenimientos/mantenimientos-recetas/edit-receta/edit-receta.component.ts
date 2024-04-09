import { Component, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-edit-receta',
  templateUrl: './edit-receta.component.html',
  styleUrls: ['./edit-receta.component.css']
})
export class EditRecetaComponent {

  tiposAlimentacion: string[] = ['Vegetariana', 'Vegana', 'Sin gluten', 'Omnívora'];
  // Datos de la tabla
  ingredientes = [
    {idIngrediente: 1, nombre: 'Ingrediente 1', cantidad: 10, editando: false},
    {idIngrediente: 2, nombre: 'Ingrediente 2', cantidad: 20, editando: false},
    // Agrega más ingredientes aquí
  ];
  displayedColumns: string[] = ['idIngrediente', 'nombre', 'cantidad','acciones'];
  form: FormGroup;

  @ViewChild(MatTable) tabla!: MatTable<any>;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditRecetaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    // Si se inserta un registro nuevo se crea un formulario vacio
    if (data == null){
      this.form = this.fb.group({
        idReceta: [null], 
        nombre: [null, Validators.required],
        descripcion: [null, Validators.required],
        kilocalorias: [null, Validators.required],
        tipoAlimentacion: [null, Validators.required],
        // Agrega más controles aquí para las otras propiedades de la receta
      });

      //La lista de ingredientes vacias:
      this.ingredientes = [];

    }else{
      // Si se edita un registro se crea un formulario con los datos del registro.
      this.form = this.fb.group({
        idReceta: [data.receta.idReceta, Validators.required], 
        nombre: [data.receta.nombre, Validators.required],
        descripcion: [data.receta.descripcion, Validators.required],
        kilocalorias: [data.receta.kilocalorias, Validators.required],
        tipoAlimentacion: [data.receta.tipoAlimentacion, Validators.required],
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

agregarIngrediente() {
  this.ingredientes.push({
    idIngrediente: this.ingredientes.length + 1, // o cualquier otro método para generar un ID único
    nombre: '',
    cantidad: 0,
    editando: true
  });

  this.tabla.renderRows();
}

}
