import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { PlantillaComponent } from './plantilla/plantilla.component';


const routes: Routes = [
  {
    path:'',
    redirectTo:'/Login',
    pathMatch:'full'
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
