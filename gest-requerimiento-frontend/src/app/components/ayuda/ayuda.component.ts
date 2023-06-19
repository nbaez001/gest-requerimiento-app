import { Component, OnInit } from '@angular/core';
import { Requerimiento } from 'src/app/dto/response/requerimiento';
import { TipoRequerimiento } from 'src/app/dto/response/tipo-requerimiento';

@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.component.html',
  styleUrls: ['./ayuda.component.scss']
})
export class AyudaComponent implements OnInit {
  tipoRequerimientoPadre: Requerimiento = new Requerimiento();

  listaTipoRequerimiento: TipoRequerimiento[] = [
    {
      nombre: 'PROYECTO',
      descripcion: 'Este tipo de requerimiento dura más de 100 horas.'
    },
    {
      nombre: 'MEJORA',
      descripcion: 'Este tipo de requerimiento dura de 5 a 99 horas.'
    },
    {
      nombre: 'CONFIGURACION',
      descripcion: 'Este tipo de Requerimiento duras a los más 4 horas.'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  changeOpcion(value: Requerimiento): void {
    console.log('CAMBIO');
    this.tipoRequerimientoPadre = value;
  }

}
