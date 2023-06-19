import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { CONSTANTES } from 'src/app/common';
import { ValidationService } from 'src/app/core/services/validation.service';
import { Area } from 'src/app/dto/response/area';
import { OutResponse } from 'src/app/dto/response/out.response';
import { Requerimiento } from 'src/app/dto/response/requerimiento';
import { AreaService } from 'src/app/services/area.service';
import { RequerimientoService } from 'src/app/services/requerimiento.service';

@Component({
  selector: 'app-requerimiento',
  templateUrl: './requerimiento.component.html',
  styleUrls: ['./requerimiento.component.scss']
})
export class RequerimientoComponent implements OnInit {
  listaArea: Subject<Area[]> = new Subject<Area[]>();
  listaRequerimiento: Subject<Requerimiento[]> = new Subject<Requerimiento[]>();

  formularioBuscarGrp: FormGroup;
  formBuscarErrors: any

  constructor(
    private fb: FormBuilder,
    @Inject(AreaService) private areaService: AreaService,
    @Inject(RequerimientoService) private requerimientoService: RequerimientoService,
    @Inject(ValidationService) private validationService: ValidationService,
  ) { }

  ngOnInit(): void {
    this.formularioBuscarGrp = this.fb.group({
      nombre: ['', []],
      apellidos: ['', []],
      descSolicitud: ['', []],
    });

    this.formBuscarErrors = this.validationService.buildFormErrors(this.formularioBuscarGrp, this.formBuscarErrors);
    this.formularioBuscarGrp.valueChanges.subscribe((val: any) => {
      this.validationService.getValidationErrors(this.formularioBuscarGrp, this.formBuscarErrors, false);
    });

    this.inicializarVariables();
  }

  inicializarVariables(): void {
    this.listarArea();

    this.buscar();
  }

  listarArea(): void {
    this.areaService.listarArea()
      .subscribe(
        (data: OutResponse<Area[]>) => {
          if (data.rcodigo == CONSTANTES.R_COD_EXITO) {
            this.listaArea.next(data.robjeto);
          } else {
            this.listaArea.next([]);
          }
        }, error => {
          console.error(error);
        }
      )
  }

  buscar(): void {
    let nombres = this.formularioBuscarGrp.get('nombre').value;
    let apellidos = this.formularioBuscarGrp.get('apellidos').value;
    let descSolicitud = this.formularioBuscarGrp.get('descSolicitud').value;

    this.requerimientoService.listar(nombres, apellidos, descSolicitud).subscribe(
      (data: OutResponse<Requerimiento[]>) => {
        console.log(data);
        if (data.rcodigo == 0) {
          this.listaRequerimiento.next(data.robjeto);
        } else {
          this.listaRequerimiento.next([]);
        }
      },
      error => {
        console.log(error);
      }
    );
  }
}
