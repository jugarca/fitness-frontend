import { TiposService } from './../../../services/tipos.service';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { EditParametroComponent } from './edit-parametro/edit-parametro.component';
import { ParametrosService } from '../../../services/parametros.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-mantenimientos-parametros',
  templateUrl: './mantenimientos-parametros.component.html',
  styleUrls: ['./mantenimientos-parametros.component.css']
})
export class MantenimientosParametrosComponent {
  parametrosArray = [];


  displayedColumns: string[] = ['tipo','codigo', 'descripcion', 'descripcionV', 'activo', 'acciones'];


  showSearch = false;
  searchValue: string | undefined;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  parametros = new MatTableDataSource(this.parametrosArray);

  constructor(public dialog: MatDialog, public dialogService: DialogService, 
    private parametrosService: ParametrosService,
    private TiposService: TiposService) {

      this.refreshTable();

  }

  applyFilter(filterValue: string) {
    this.parametros.filter = filterValue.trim().toLowerCase();
  }

  abrirModal(): void {
    const dialogRef = this.dialog.open(EditParametroComponent, {
      width: '50%'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.refreshTable();
    });
  }

  addRecord() {
    // Aquí va tu código para añadir un nuevo registro
  }

  openEditDialog(parametro: any) {
    const dialogRef = this.dialog.open(EditParametroComponent, {
      width: '50%',
      data: {parametro: parametro}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.refreshTable();
    });
  }

  confirmarBorrado(parametro: any){
    this.dialogService.openConfirmDialog('¿Estás seguro de que quieres borrar el registro?').afterClosed().subscribe(res => {
      if (res) {
        this.parametrosService.delete(parametro).subscribe(data => {
            this.refreshTable();
        });
      } 
    });
  }

  private refreshTable() {
    this.parametrosService.getParametros().subscribe(data => {
      this.parametrosArray = data;
      this.parametros = new MatTableDataSource(this.parametrosArray);
      this.parametros.sort = this.sort;
      this.parametros.paginator = this.paginator;
    });
  }
}
