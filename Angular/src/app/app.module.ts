import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarraComponent } from './barra/barra.component';
import { FootComponent } from './foot/foot.component';
import { LoginComponent } from './login/login.component';
import { PlantillaComponent } from './plantilla/plantilla.component';
import { BarrausrComponent } from './barrausr/barrausr.component';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    BarraComponent,
    FootComponent,
    LoginComponent,
    PlantillaComponent,
    BarrausrComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
