import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { EditUsuarioComponent } from './edit-usuario/edit-usuario.component';

@Component({
  selector: 'app-mantenimientos-usuarios',
  templateUrl: './mantenimientos-usuarios.component.html',
  styleUrls: ['./mantenimientos-usuarios.component.css']
})
export class MantenimientosUsuariosComponent {
  usuariosArray = [
    { id: 1, nombre: 'Usuario 1', email: 'usuario1@example.com', rol: 'Admin', edad: 30, altura: 170, peso: 70, nivel: 'Avanzado', tiempo: '30 minutos', objetivo: 'Perder peso' },
    { id: 2, nombre: 'Usuario 2', email: 'usuario2@example.com', rol: 'Usuario', edad: 25, altura: 175, peso: 80, nivel: 'Intermedio', tiempo: '45 minutos', objetivo: 'Ganar músculo' },
    { id: 3, nombre: 'Usuario 3', email: 'usuario3@example.com', rol: 'Usuario', edad: 35, altura: 180, peso: 75, nivel: 'Principiante', tiempo: '20 minutos', objetivo: 'Mejorar resistencia' },
    { id: 4, nombre: 'Usuario 4', email: 'usuario4@example.com', rol: 'Admin', edad: 40, altura: 165, peso: 65, nivel: 'Avanzado', tiempo: '60 minutos', objetivo: 'Aumentar flexibilidad' },
    { id: 5, nombre: 'Usuario 5', email: 'usuario5@example.com', rol: 'Usuario', edad: 28, altura: 172, peso: 68, nivel: 'Intermedio', tiempo: '30 minutos', objetivo: 'Mantener forma' },
    { id: 6, nombre: 'Usuario 6', email: 'usuario6@example.com', rol: 'Usuario', edad: 32, altura: 185, peso: 85, nivel: 'Principiante', tiempo: '15 minutos', objetivo: 'Perder peso' }
  ];

  displayedColumns: string[] = ['id', 'nombre', 'email', 'rol', 'edad', 'altura', 'peso', 'nivel', 'tiempo', 'objetivo', 'acciones'];


  showSearch = false;
  searchValue: string | undefined;
  usuarios = new MatTableDataSource(this.usuariosArray);

  constructor(public dialog: MatDialog, public dialogService: DialogService) {}

  applyFilter(filterValue: string) {
    this.usuarios.filter = filterValue.trim().toLowerCase();
  }

  abrirModal(): void {
    this.dialog.open(EditUsuarioComponent);
  }

  addRecord() {
    // Aquí va tu código para añadir un nuevo registro
  }

  openEditDialog(usuario: any) {
    const dialogRef = this.dialog.open(EditUsuarioComponent, {
      width: '50%',
      data: {usuario: usuario}
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
