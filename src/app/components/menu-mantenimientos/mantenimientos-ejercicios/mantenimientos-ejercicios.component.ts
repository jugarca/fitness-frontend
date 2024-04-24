import { Component } from '@angular/core';
import { EditEjercicioComponent } from './edit-ejercicio/edit-ejercicio.component';
import { MatTableDataSource } from '@angular/material/table';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-mantenimientos-ejercicios',
  templateUrl: './mantenimientos-ejercicios.component.html',
  styleUrls: ['./mantenimientos-ejercicios.component.css']
})
export class MantenimientosEjerciciosComponent {
  displayedColumns: string[] = ['id', 'nombre', 'objetivo', 'nivel', 'duracion', 'grupoMuscular', 'deporte', 'material', 'acciones'];
  
  ejerciciosArray = [
    { id: 1, nombre: 'Press Banca', objetivo: 'Perder peso', nivel: 'Avanzado', duracion: '20 minutos', grupoMuscular: 'Pecho', deporte: 'Fútbol', material: 'Balón' },
  { id: 2, nombre: 'Sentadillas', objetivo: 'Ganar músculo', nivel: 'Intermedio', duracion: '4 minutos', grupoMuscular: 'Espalda', deporte: 'Baloncesto', material: 'Pesas' },
  { id: 3, nombre: 'Correr', objetivo: 'Mejorar resistencia', nivel: 'Principiante', duracion: '30 minutos', grupoMuscular: 'Piernas', deporte: 'Ciclismo', material: 'Bicicleta' },
  { id: 4, nombre: 'Salto de Soga', objetivo: 'Aumentar flexibilidad', nivel: 'Avanzado', duracion: '20 minutos', grupoMuscular: 'Todo el cuerpo', deporte: 'Yoga', material: 'Esterilla' },
  { id: 5, nombre: 'Flexiones', objetivo: 'Mantener forma', nivel: 'Intermedio', duracion: '10 repeticiones', grupoMuscular: 'Abdominales', deporte: 'Gimnasia', material: 'Cuerda' }
  ];

  showSearch = false;
  searchValue: string | undefined;
  ejercicios = new MatTableDataSource(this.ejerciciosArray);

  constructor(public dialog: MatDialog, public dialogService: DialogService) {}

  applyFilter(filterValue: string) {
    this.ejercicios.filter = filterValue.trim().toLowerCase();
  }

  abrirModal(): void {
    this.dialog.open(EditEjercicioComponent);
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
