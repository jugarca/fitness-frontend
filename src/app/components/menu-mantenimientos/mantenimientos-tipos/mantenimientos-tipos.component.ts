import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { EditTipoComponent } from './edit-tipo/edit-tipo.component';
import { TiposService } from 'src/app/services/tipos.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-mantenimientos-tipos',
  templateUrl: './mantenimientos-tipos.component.html',
  styleUrls: ['./mantenimientos-tipos.component.css']
})
export class MantenimientosTiposComponent{

  tiposArray = []

  displayedColumns: string[] = ['codigo', 'descripcion', 'descripcionValenciano', 'activo', 'acciones'];


  showSearch = false;
  searchValue: string | undefined;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  tipos = new MatTableDataSource(this.tiposArray);

  

  constructor(public dialog: MatDialog, public dialogService: DialogService, private tiposService: TiposService) {
    this.refreshTable();
  }

  applyFilter(filterValue: string) {
    this.tipos.filter = filterValue.trim().toLowerCase();
  }

  abrirModal(): void {
    const dialogRef = this.dialog.open(EditTipoComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo fue cerrado');
      // Aquí puedes manejar el resultado del diálogo (por ejemplo, actualizar el ejercicio)
      this.refreshTable();
    });
  }

  addRecord() {
    // Aquí va tu código para añadir un nuevo registro
  }

  openEditDialog(tipo: any) {
    const dialogRef = this.dialog.open(EditTipoComponent, {
      width: '50%',
      data: {tipo: tipo}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo fue cerrado');
      // Aquí puedes manejar el resultado del diálogo (por ejemplo, actualizar el ejercicio)
      this.refreshTable();
    });
  }

  confirmarBorrado(tipo: any){
    this.dialogService.openConfirmDialog('¿Estás seguro de que quieres borrar el registro?').afterClosed().subscribe(res => {
      if (res) {
        this.tiposService.delete(tipo.codigo).subscribe(data => {
          this.refreshTable();
        });
      } 
    });
  }

  private refreshTable() {
    this.tiposService.getTipos().subscribe(data => {
      this.tiposArray = data;
      this.tipos = new MatTableDataSource(this.tiposArray);
      this.tipos.sort = this.sort;
      this.tipos.paginator = this.paginator;
    });
  }

}
