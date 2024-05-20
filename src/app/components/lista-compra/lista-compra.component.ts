import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UsuarioListaService } from 'src/app/services/usuario-lista.service';

@Component({
  selector: 'app-lista-compra',
  templateUrl: './lista-compra.component.html',
  styleUrls: ['./lista-compra.component.css']
})
export class ListaCompraComponent {
  listaCompra = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource(this.listaCompra);

  displayedColumns: string[] = ['id','nombre', 'cantidad', 'comprado'];

  constructor(private usuarioListaService: UsuarioListaService) {
    this.usuarioListaService.getByUserId(Number(sessionStorage.getItem('id'))).subscribe(data => {
      console.log(data);
      this.listaCompra = data;
      this.dataSource = new MatTableDataSource(this.listaCompra);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  guardarComprado(producto: any){

    if (producto.comprado) {
      console.log('El producto ha sido comprado', producto.comprado);
    } else {
      console.log('El producto no ha sido comprado', producto.comprado);
    }

    this.usuarioListaService.saveEstado(producto).subscribe(data => {
      console.log("Guardado correctamente");
      
    });
    console.log(producto);
  }
}
