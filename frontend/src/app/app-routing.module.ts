import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { E404Component } from './e404/e404.component';
import { PlantillaComponent } from './plantilla/plantilla.component';
import { RegistroComponent } from './registro/registro.component';
import { CuentaHabilitarComponent } from './cuenta-habilitar/cuenta-habilitar.component';
import { CuentaBajaComponent } from './cuenta-baja/cuenta-baja.component';
import { CuentaAltaComponent } from './cuenta-alta/cuenta-alta.component';

const routes: Routes = [
  {
  path:'',
  redirectTo:'/E404',
  pathMatch:'full'
},
{
  path:'E404',
  component: E404Component
},
{
  path:'Login',
  component: LoginComponent
},
{
  path:'Plantilla',
  component: PlantillaComponent
},
{
  path:'Admin',
  component: AdminComponent
},
{
  path:'Registro',
  component:RegistroComponent
},
{
  path:'CuentaAlta',
  component:CuentaAltaComponent
},
{
  path:'CuentaBaja',
  component:CuentaBajaComponent
},
{
  path:'CuentaHabilitar',
  component:CuentaHabilitarComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
