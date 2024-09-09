import { Routes } from '@angular/router';
import { ProductListComponent } from './components/products/list/list.component';
import { ProductFormComponent } from './components/products/form/form.component';

export const routes: Routes = [
  {
    path: '',
    component: ProductListComponent
  },
];
