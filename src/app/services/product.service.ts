import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:5153/api/Api';  // URL base de la API

  constructor(private http: HttpClient) {}

  // Configurar encabezados si es necesario
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      // Agrega otros encabezados aquí si es necesario
    });
  }

  // Método GET para obtener datos
  getData(endpoint: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${endpoint}`, { headers: this.getHeaders() });
  }

  // Método GET para obtener un Producto por ID
  getProductById(endpoint: string, idProducto: number): Observable<any> {
    const url = `${this.baseUrl}/${endpoint}?id=${idProducto}`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  // Método para crear un nuevo Producto
  createProduct(endpoint: string, Product: Product): Observable<any> {
    return this.http.post(`${this.baseUrl}/${endpoint}`, Product, { headers: this.getHeaders() });
  }

  // Método para actualizar un Producto existente
  updateProduct(endpoint: string, Product: Product): Observable<any> {
    return this.http.put(`${this.baseUrl}/${endpoint}?id=${Product.idProducto}`, Product, { headers: this.getHeaders() });
  }

  // Método DELETE para eliminar Producto
  deleteProduct(endpoint: string, idProducto: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${endpoint}?id=${idProducto}`);
  }

}
