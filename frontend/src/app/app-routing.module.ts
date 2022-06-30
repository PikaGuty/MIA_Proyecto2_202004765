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
import { UsuarioComponent } from './usuario/usuario.component';
import { ColabComponent } from './colab/colab.component';
import { ReportarComponent } from './reportar/reportar.component';
import { DatosComponent } from './datos/datos.component';
import { AutenticaAdminGuard } from './autentica-admin.guard';
import { IntrusoComponent } from './intruso/intruso.component';
import { AutenticaUsrGuard } from './autentica-usr.guard';
import { CalmaoComponent } from './calmao/calmao.component';
import { AcsDenegadoComponent } from './acs-denegado/acs-denegado.component';


const routes: Routes = [

{
  path:'E404',
  component: E404Component
  
},
{
  path:'Intruso',
  component: IntrusoComponent
  
},
{
  path:'Calmao',
  component: CalmaoComponent
  
},
{
  path:'Denegao',
  component: AcsDenegadoComponent
  
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
  component: AdminComponent,
  canActivate:[AutenticaAdminGuard]
},
{
  path:'Usuario',
  component: UsuarioComponent,
  canActivate:[AutenticaUsrGuard]
},
{
  path:'Registro',
  component:RegistroComponent
},
{
  path:'CuentaAlta',
  component:CuentaAltaComponent,
  canActivate:[AutenticaAdminGuard]
},
{
  path:'CuentaBaja',
  component:CuentaBajaComponent,
  canActivate:[AutenticaAdminGuard]
},
{
  path:'CuentaHabilitar',
  component:CuentaHabilitarComponent,
  canActivate:[AutenticaAdminGuard]
},
{
  path:'Colab',
  component:ColabComponent,
  canActivate:[AutenticaUsrGuard]
},
{
  path:'Reportar',
  component:ReportarComponent,
  canActivate:[AutenticaUsrGuard]
},
{
  path:'Datos',
  component:DatosComponent,
  canActivate:[AutenticaUsrGuard]
},
{
  path:'**',
  redirectTo:'/E404',
  pathMatch:'full'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
