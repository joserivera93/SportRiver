import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarClientesComponent } from './agregar-clientes/agregar-clientes.component';
import { HomeComponent } from './home/home.component';
import { InscripcionComponent } from './inscripcion/inscripcion.component';
import { ListadoClientesComponent } from './listado-clientes/listado-clientes.component';
import { ListadoInscripcionesComponent } from './listado-inscripciones/listado-inscripciones.component';
import { PreciosComponent } from './precios/precios.component';

const routes: Routes = [
  {
    path: 'home', component: HomeComponent
  },

  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'inscripcion', component: InscripcionComponent
  },
  {
    path: 'listado-clientes', component: ListadoClientesComponent
  },
  {
    path: 'agregar-clientes', component: AgregarClientesComponent
  },
  {
    path: 'agregar-clientes/:clienteID', component: AgregarClientesComponent
  },
  {
    path: 'precios', component: PreciosComponent
  },
  {
    path: 'listado-inscripciones' , component: ListadoInscripcionesComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
