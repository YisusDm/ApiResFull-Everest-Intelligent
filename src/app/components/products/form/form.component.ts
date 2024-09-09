import { Product } from '../../../models/product.model';
import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ApiService } from '../../../services/product.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [FormsModule, HttpClientModule], // Importa FormsModule para el manejo de formularios
  providers: [ApiService, HttpClient],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class ProductFormComponent {
  @Output() productSaved = new EventEmitter<Product>();
  @Output() close = new EventEmitter<boolean>();

  // Product => Editar
  // null => Creación
  @Input() itemSelected: Product = {
    idProducto:0,
    nombre: '',
    tipo: '',
    cantidad: 0,
    precioUnitario: 0,
    estado: true,
    fechaCreacion: new Date(),
  };

  constructor(private apiservice: ApiService) { }

  onSubmit(): void {
    if (!this.itemSelected) return;

    //Creación
    if (this.itemSelected.idProducto === 0) {  // Comprobamos si es un nuevo product
      this.apiservice.createProduct('CrearProducto', this.itemSelected).subscribe({
        next: response => {
          alert('Creado Correctamente')
          this.productSaved.emit(this.itemSelected);
          this.close.emit(true);
        },
        error: error => alert('Error en la creación del producto')
      });

    } else {
      this.apiservice.updateProduct('ModificarProducto', this.itemSelected).subscribe({
        next: response => {
          alert('Actualizado Correctamente')
          this.productSaved.emit(this.itemSelected);
          this.close.emit(true);
        },
        error: error => alert('Error en la actualización del producto')
      });
    }
  }

  closeModal(e: any): void {
    e.preventDefault();
    this.close.emit(true);
  }
}
