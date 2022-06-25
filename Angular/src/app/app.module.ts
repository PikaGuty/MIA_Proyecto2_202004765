import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarraComponent } from './barra/barra.component';
import { FootComponent } from './foot/foot.component';
import { LoginComponent } from './login/login.component';
import { PlantillaComponent } from './plantilla/plantilla.component';
import { BarrausrComponent } from './barrausr/barrausr.component';
import { AdminComponent } from './admin/admin.component';
import { E404Component } from './e404/e404.component';
import { RegistroComponent } from './registro/registro.component';
import { CuentaAltaComponent } from './cuenta-alta/cuenta-alta.component';
import { CuentaBajaComponent } from './cuenta-baja/cuenta-baja.component';
import { CuentaHabilitarComponent } from './cuenta-habilitar/cuenta-habilitar.component';

@NgModule({
  declarations: [
    AppComponent,
    BarraComponent,
    FootComponent,
    LoginComponent,
    PlantillaComponent,
    BarrausrComponent,
    AdminComponent,
    E404Component,
    RegistroComponent,
    CuentaAltaComponent,
    CuentaBajaComponent,
    CuentaHabilitarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
