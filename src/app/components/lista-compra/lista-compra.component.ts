import { Component } from '@angular/core';

@Component({
  selector: 'app-lista-compra',
  templateUrl: './lista-compra.component.html',
  styleUrls: ['./lista-compra.component.css']
})
export class ListaCompraComponent {
  listaCompra = [
    { nombre: 'Manzanas', cantidad: 10, comprado: false },
    { nombre: 'Naranjas', cantidad: 5, comprado: false },
    // Añade más productos aquí
  ];

  displayedColumns: string[] = ['nombre', 'cantidad', 'comprado'];
}
