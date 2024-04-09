import { Component } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { RecetaDialogComponent } from './receta-dialog-component';

@Component({
  selector: 'app-recetas-usuario',
  templateUrl: './recetas-usuario.component.html',
  styleUrls: ['./recetas-usuario.component.css']
})
export class RecetasUsuarioComponent {

  displayedColumns: string[] = ['nombrePlato', 'kilocalorias', 'tipoAlimentacion', 'fecha', 'horarioComida', 'acciones'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  constructor(public dialog: MatDialog) {}

  verReceta(element: PeriodicElement) {
    // Aquí puedes definir lo que sucede cuando se hace clic en el botón de ver receta
    this.dialog.open(RecetaDialogComponent, {
      data: {
        nombre: element.nombrePlato,
        descripcion: "Esta informacion se cargara desde la base de datos",
        kilocalorias: element.kilocalorias,
        tipoAlimentacion: element.tipoAlimentacion,
        ingredientes: "Esta informacion se cargara desde la base de datos"
      },
      width: '500px',
      height: '300px'
    });
  }

}


export interface PeriodicElement {
  nombrePlato: string;
  kilocalorias: number;
  tipoAlimentacion: string;
  fecha: string;
  horarioComida: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {nombrePlato: 'Plato 1', kilocalorias: 200, tipoAlimentacion: 'Vegetariana', fecha: '2022-01-01', horarioComida: 'Desayuno'},
  {nombrePlato: 'Plato 2', kilocalorias: 300, tipoAlimentacion: 'Vegana', fecha: '2022-01-02', horarioComida: 'Almuerzo'},
  {nombrePlato: 'Plato 3', kilocalorias: 400, tipoAlimentacion: 'Omnivora', fecha: '2022-01-03', horarioComida: 'Cena'},
  {nombrePlato: 'Plato 1', kilocalorias: 200, tipoAlimentacion: 'Vegetariana', fecha: '2022-01-01', horarioComida: 'Desayuno'},
  {nombrePlato: 'Plato 2', kilocalorias: 300, tipoAlimentacion: 'Vegana', fecha: '2022-01-02', horarioComida: 'Almuerzo'},
  {nombrePlato: 'Plato 3', kilocalorias: 400, tipoAlimentacion: 'Omnivora', fecha: '2022-01-03', horarioComida: 'Cena'},
  {nombrePlato: 'Plato 1', kilocalorias: 200, tipoAlimentacion: 'Vegetariana', fecha: '2022-01-01', horarioComida: 'Desayuno'},
  {nombrePlato: 'Plato 2', kilocalorias: 300, tipoAlimentacion: 'Vegana', fecha: '2022-01-02', horarioComida: 'Almuerzo'},

  // Agrega más registros aquí
];
