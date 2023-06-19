import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RequerimientoComponent } from './components/requerimiento/requerimiento.component';
import { AyudaComponent } from './components/ayuda/ayuda.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedService } from './services/shared.service';
import { AyudaDescripcionComponent } from './components/ayuda/ayuda-descripcion/ayuda-descripcion.component';

@NgModule({
  declarations: [
    AppComponent,
    RequerimientoComponent,
    AyudaComponent,
    AyudaDescripcionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    ...SharedService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
