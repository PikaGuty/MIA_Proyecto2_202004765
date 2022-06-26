import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTreeModule } from '@angular/material/tree';
import {MatButtonModule} from "@angular/material/button"
import {MatIconModule} from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminComponent } from './admin/admin.component';
import { BarraComponent } from './barra/barra.component';
import { BarrausrComponent } from './barrausr/barrausr.component';
//import { CuentaAltaComponent } from './cuenta-alta/cuenta-alta.component';
import { CuentaBajaComponent } from './cuenta-baja/cuenta-baja.component';
import { CuentaHabilitarComponent } from './cuenta-habilitar/cuenta-habilitar.component';
import { E404Component } from './e404/e404.component';
import { FootComponent } from './foot/foot.component';
import { LoginComponent } from './login/login.component';
import { PlantillaComponent } from './plantilla/plantilla.component';
import { RegistroComponent } from './registro/registro.component';
import { CuentaAltaComponent } from './cuenta-alta/cuenta-alta.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    BarraComponent,
    BarrausrComponent,
    CuentaBajaComponent,
    CuentaHabilitarComponent,
    E404Component,
    FootComponent,
    LoginComponent,
    PlantillaComponent,
    RegistroComponent,
    CuentaAltaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
