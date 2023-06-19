import { Component, Input, OnInit } from '@angular/core';
import { TipoRequerimiento } from 'src/app/dto/response/tipo-requerimiento';

@Component({
  selector: 'app-ayuda-descripcion',
  templateUrl: './ayuda-descripcion.component.html',
  styleUrls: ['./ayuda-descripcion.component.scss']
})
export class AyudaDescripcionComponent implements OnInit {
  @Input()
  tipoRequerimiento: TipoRequerimiento;

  constructor() { }

  ngOnInit(): void {
  }

}
