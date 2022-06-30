import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTreeModule } from '@angular/material/tree';
import {MatButtonModule} from "@angular/material/button"
import {MatIconModule} from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
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
import { MatDialogModule } from "@angular/material/dialog";
import { PopUpPropietarioComponent } from './pop-up-propietario/pop-up-propietario.component'
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { UsuarioComponent } from './usuario/usuario.component';
import { ColabComponent } from './colab/colab.component';
import { ReportarComponent } from './reportar/reportar.component';
import { DatosComponent } from './datos/datos.component';
import { IntrusoComponent } from './intruso/intruso.component';
import { CalmaoComponent } from './calmao/calmao.component';
import { AcsDenegadoComponent } from './acs-denegado/acs-denegado.component';

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
    CuentaAltaComponent,
    PopUpPropietarioComponent,
    UsuarioComponent,
    ColabComponent,
    ReportarComponent,
    DatosComponent,
    IntrusoComponent,
    CalmaoComponent,
    AcsDenegadoComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
