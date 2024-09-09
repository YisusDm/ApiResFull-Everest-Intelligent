import { Component } from '@angular/core';
import { NgFor,NgClass  } from '@angular/common';
import { Product } from '../../../models/product.model';
import { ProductFormComponent } from '../form/form.component';
import { HttpClientModule, HttpClient  } from '@angular/common/http';
import { ApiService } from '../../../services/product.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-Product-list',
  standalone: true,
  imports: [NgFor, NgClass, ProductFormComponent, HttpClientModule, ProductFormComponent],
  providers: [ApiService, HttpClient],  // Añadir aquí ApiService y HttpClient como proveedores
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ProductListComponent {

  ProductList: Product[] = [];
  editingProduct: Product = {
    idProducto:0,
    nombre: '',
    tipo: '',
    cantidad: 0,
    precioUnitario: 0,
    estado: true,
    fechaCreacion: new Date(),
  };

  showModal = false;
  action: 'create' | 'update' = 'create';

  itemSelected: Product = {
    idProducto:0,
    nombre: '',
    tipo: '',
    cantidad: 0,
    precioUnitario: 0,
    estado: true,
    fechaCreacion: new Date(),
  };

  constructor(private apiservice: ApiService, private router: Router){}


  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.apiservice.getData('ObtenerProductos').subscribe((Products: Product[]) => {
      this.ProductList = Products;
    });
  }

  onCreateProduct(): void {
    this.showModal = true;
    this.action = 'create';
    this.itemSelected = {
      idProducto:0,
      nombre: '',
      tipo: '',
      cantidad: 0,
      precioUnitario: 0,
      estado: true,
      fechaCreacion: new Date(),
    };
  }

  onEditProduct(Product: Product): void {
    this.showModal = true;
    this.action = 'update';
    this.itemSelected = Product;
  }

  onCloseModal(action: boolean): void {
    this.showModal = !action;
    this.itemSelected = {
      idProducto:0,
      nombre: '',
      tipo: '',
      cantidad: 0,
      precioUnitario: 0,
      estado: true,
      fechaCreacion: new Date(),
    };
  }

  onDeleteProduct(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este Producto?')) {
      this.apiservice.deleteProduct('EliminarProducto',id).subscribe(() => {
        this.ProductList = this.ProductList.filter(u => u.idProducto !== id);
      }, error => {
        console.error('Error deleting user:', error);
      });
    }
  }
}
