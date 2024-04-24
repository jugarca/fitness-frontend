import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ejercicios',
  templateUrl: './ejercicios.component.html',
  styleUrls: ['./ejercicios.component.css']
})
export class EjerciciosComponent {

  displayedColumns: string[] = ['nombreEntrenamiento', 'descripcion', 'duracion', 'fecha', 'material', 'acciones'];
  dataSource = new MatTableDataSource<EjercicioUsuario>(ELEMENT_DATA);

  constructor(public dialog: MatDialog, private router: Router) {}

  verEjercicio(element: EjercicioUsuario) {
    this.router.navigate(['/detalle-entrenamiento', element.nombreEntrenamiento]);
    // Aquí puedes definir lo que sucede cuando se hace clic en el botón de ver receta
    /*this.dialog.open(RecetaDialogComponent, {
      data: {
        nombre: element.nombrePlato,
        descripcion: "Esta informacion se cargara desde la base de datos",
        kilocalorias: element.kilocalorias,
        tipoAlimentacion: element.tipoAlimentacion,
        ingredientes: "Esta informacion se cargara desde la base de datos"
      },
      width: '500px',
      height: '300px'
    });*/
  }

}


export interface EjercicioUsuario {
  nombreEntrenamiento: string;
  descripcion: string;
  fecha: string;
  duracion: string;
  material: string;
}

const ELEMENT_DATA: EjercicioUsuario[] = [
  {
    nombreEntrenamiento: 'Entrenamiento 1',
    descripcion: 'Entrenamiento de fuerza',
    fecha: '2022-01-01',
    duracion: '30 minutos',
    material: 'Pesas'
  },
  {
    nombreEntrenamiento: 'Entrenamiento 2',
    descripcion: 'Entrenamiento de cardio',
    fecha: '2022-01-02',
    duracion: '45 minutos',
    material: 'Cinta de correr'
  },
  {
    nombreEntrenamiento: 'Entrenamiento 3',
    descripcion: 'Entrenamiento de flexibilidad',
    fecha: '2022-01-03',
    duracion: '15 minutos',
    material: 'Esterilla de yoga'
  }
];
  // Agrega más registros aquí