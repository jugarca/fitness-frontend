import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { EditEjercicioComponent } from './edit-ejercicio/edit-ejercicio.component';

@Component({
  selector: 'app-mantenimientos-ejercicios',
  templateUrl: './mantenimientos-ejercicios.component.html',
  styleUrls: ['./mantenimientos-ejercicios.component.css']
})
export class MantenimientosEjerciciosComponent {
  displayedColumns: string[] = ['id', 'nombre', 'objetivo', 'nivel', 'duracion', 'grupoMuscular', 'deporte', 'material', 'acciones'];

  ejerciciosArray = [
    { id: 1, nombre: 'Ejercicio 1', objetivo: 'Objetivo 1', nivel: 'Nivel 1', duracion: '30 min', grupoMuscular: 'Grupo 1', deporte: 'Deporte 1', material: 'Material 1' },
    { id: 2, nombre: 'Ejercicio 2', objetivo: 'Objetivo 2', nivel: 'Nivel 2', duracion: '45 min', grupoMuscular: 'Grupo 2', deporte: 'Deporte 2', material: 'Material 2' },
    { id: 3, nombre: 'Ejercicio 3', objetivo: 'Objetivo 3', nivel: 'Nivel 3', duracion: '60 min', grupoMuscular: 'Grupo 3', deporte: 'Deporte 3', material: 'Material 3' },
    { id: 4, nombre: 'Ejercicio 4', objetivo: 'Objetivo 4', nivel: 'Nivel 4', duracion: '75 min', grupoMuscular: 'Grupo 4', deporte: 'Deporte 4', material: 'Material 4' },
    { id: 5, nombre: 'Ejercicio 5', objetivo: 'Objetivo 5', nivel: 'Nivel 5', duracion: '90 min', grupoMuscular: 'Grupo 5', deporte: 'Deporte 5', material: 'Material 5' },
];

  showSearch = false;
  searchValue: string | undefined;
  ejercicios = new MatTableDataSource(this.ejerciciosArray);

  constructor(public dialog: MatDialog, public dialogService: DialogService) {}

  applyFilter(filterValue: string) {
    this.ejercicios.filter = filterValue.trim().toLowerCase();
  }

  abrirModal(): void {
    //this.dialog.open(EditEjercicioComponent);
  }

  addRecord() {
    // Aquí va tu código para añadir un nuevo registro
  }

  openEditDialog(ejercicio: any) {
    const dialogRef = this.dialog.open(EditEjercicioComponent, {
      width: '50%',
      data: {ejercicio: ejercicio}
    });
 
    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo fue cerrado');
      // Aquí puedes manejar el resultado del diálogo (por ejemplo, actualizar el ejercicio)
    });
  }

  confirmarBorrado(){
    this.dialogService.openConfirmDialog('¿Estás seguro de que quieres borrar el registro?').afterClosed().subscribe(res => {
      if (res) {
        // El usuario hizo clic en Aceptar
        alert('Borrado Correctamente');
      } else {
        // El usuario hizo clic en Cancelar
        alert('Cancelado');
      }
    });
  }
}
