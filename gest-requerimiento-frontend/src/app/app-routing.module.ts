import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AyudaComponent } from './components/ayuda/ayuda.component';
import { RequerimientoComponent } from './components/requerimiento/requerimiento.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'requerimiento',
    pathMatch: 'full'
  },
  {
    path: 'requerimiento',
    component: RequerimientoComponent
  },
  {
    path: 'ayuda',
    component: AyudaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
