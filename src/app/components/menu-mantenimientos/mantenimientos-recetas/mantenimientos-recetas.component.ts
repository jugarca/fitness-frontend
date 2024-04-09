import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EditRecetaComponent } from './edit-receta/edit-receta.component';

@Component({
  selector: 'app-mantenimientos-recetas',
  templateUrl: './mantenimientos-recetas.component.html',
  styleUrls: ['./mantenimientos-recetas.component.css']
})
export class MantenimientosRecetasComponent {

  

  displayedColumns: string[] = ['idReceta', 'nombre', 'descripcion', 'kilocalorias', 'tipoAlimentacion', 'acciones'];
  
  recetasArray = [
    { idReceta: 1, nombre: 'Receta 1', descripcion: 'Descripción 1', kilocalorias: 200, tipoAlimentacion: 'Vegetariana' },
    { idReceta: 2, nombre: 'Receta 2', descripcion: 'Descripción 2', kilocalorias: 300, tipoAlimentacion: 'Vegana' },
    { idReceta: 3, nombre: 'Receta 3', descripcion: 'Descripción 3', kilocalorias: 400, tipoAlimentacion: 'Sin gluten' },
    { idReceta: 4, nombre: 'Receta 4', descripcion: 'Descripción 4', kilocalorias: 500, tipoAlimentacion: 'Omnívora' },
    { idReceta: 5, nombre: 'Receta 5', descripcion: 'Descripción 5', kilocalorias: 600, tipoAlimentacion: 'Vegetariana' },
    { idReceta: 6, nombre: 'Receta 6', descripcion: 'Descripción 6', kilocalorias: 700, tipoAlimentacion: 'Vegana' },
    { idReceta: 7, nombre: 'Receta 7', descripcion: 'Descripción 7', kilocalorias: 800, tipoAlimentacion: 'Sin gluten' },
    { idReceta: 8, nombre: 'Receta 8', descripcion: 'Descripción 8', kilocalorias: 900, tipoAlimentacion: 'Omnívora' },
    { idReceta: 9, nombre: 'Receta 9', descripcion: 'Descripción 9', kilocalorias: 1000, tipoAlimentacion: 'Vegetariana' },
    { idReceta: 10, nombre: 'Receta 10', descripcion: 'Descripción 10', kilocalorias: 1100, tipoAlimentacion: 'Vegana' },
  ];

showSearch = false;
searchValue: string | undefined;
recetas = new MatTableDataSource(this.recetasArray); // Asegúrate de reemplazar RECETAS_ARRAY con tu array de recetas

constructor(public dialog: MatDialog) {}

applyFilter(filterValue: string) {
  this.recetas.filter = filterValue.trim().toLowerCase();
}

abrirModal(): void {
  this.dialog.open(EditRecetaComponent);
}

addRecord() {
  // Aquí va tu código para añadir un nuevo registro
}

openEditDialog(receta: any) {
  const dialogRef = this.dialog.open(EditRecetaComponent, {
    width: '50%',
    data: {receta: receta}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('El diálogo fue cerrado');
    // Aquí puedes manejar el resultado del diálogo (por ejemplo, actualizar la receta)
  });
}

}
