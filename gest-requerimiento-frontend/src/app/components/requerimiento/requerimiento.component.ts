import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { CONSTANTES } from 'src/app/common';
import { ValidationService } from 'src/app/core/services/validation.service';
import { Area } from 'src/app/dto/response/area';
import { OutResponse } from 'src/app/dto/response/out.response';
import { Requerimiento } from 'src/app/dto/response/requerimiento';
import { AreaService } from 'src/app/services/area.service';
import { RequerimientoService } from 'src/app/services/requerimiento.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-requerimiento',
  templateUrl: './requerimiento.component.html',
  styleUrls: ['./requerimiento.component.scss']
})
export class RequerimientoComponent implements OnInit {
  @ViewChild('closebutton') closebutton;
  @ViewChild('closebutton2') closebutton2;

  fileupload: any;

  listaArea: Area[] = [];
  listaRequerimiento: Requerimiento[] = [];

  formularioBuscarGrp: FormGroup;
  formBuscarErrors: any

  formularioRegistrarGrp: FormGroup;
  formRegistrarErrors: any

  formularioModificarGrp: FormGroup;
  formModificarErrors: any

  requerimientoMod: Requerimiento;

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

    this.formularioRegistrarGrp = this.fb.group({
      nombre: ['', []],
      apellidos: ['', []],
      area: ['', []],
      nomSolicitud: ['', []],
      descSolicitud: ['', []],
    });

    this.formRegistrarErrors = this.validationService.buildFormErrors(this.formularioRegistrarGrp, this.formRegistrarErrors);
    this.formularioRegistrarGrp.valueChanges.subscribe((val: any) => {
      this.validationService.getValidationErrors(this.formularioRegistrarGrp, this.formRegistrarErrors, false);
    });

    this.formularioModificarGrp = this.fb.group({
      nombre: ['', []],
      apellidos: ['', []],
      area: ['', []],
      nomSolicitud: ['', []],
      descSolicitud: ['', []],
    });

    this.formModificarErrors = this.validationService.buildFormErrors(this.formularioModificarGrp, this.formModificarErrors);
    this.formularioModificarGrp.valueChanges.subscribe((val: any) => {
      this.validationService.getValidationErrors(this.formularioModificarGrp, this.formModificarErrors, false);
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
            this.listaArea = data.robjeto;
          } else {
            this.listaArea = [];
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
          this.listaRequerimiento = data.robjeto;
        } else {
          this.listaRequerimiento = [];
        }
      },
      error => {
        console.log(error);
        Swal.fire({
          title: 'Error!',
          text: error,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })
      }
    );
  }

  guardar(): void {
    let req = new Requerimiento();
    req.nombre = this.formularioRegistrarGrp.get('nombre').value;
    req.apellidos = this.formularioRegistrarGrp.get('apellidos').value;
    req.idArea = this.formularioRegistrarGrp.get('area').value ? this.formularioRegistrarGrp.get('area').value.id : null;
    req.nomSolicitud = this.formularioRegistrarGrp.get('nomSolicitud').value;
    req.descSolicitud = this.formularioRegistrarGrp.get('descSolicitud').value;
    req.flgActivo = 1;
    req.urlAnexo = 'url';

    const formData = new FormData();

    formData.append("file", this.fileupload ? this.fileupload : null);
    formData.append('data', JSON.stringify(req));

    this.requerimientoService.guardar(formData).subscribe(
      (data: OutResponse<Requerimiento>) => {
        console.log(data);
        if (data.rcodigo == 0) {
          data.robjeto.nombreArea = this.formularioRegistrarGrp.get('area').value ? this.formularioRegistrarGrp.get('area').value.nombre : null;
          this.listaRequerimiento.push(data.robjeto);

          this.closebutton.nativeElement.click();
          Swal.fire({
            text: data.rmensaje,
            icon: 'success',
            confirmButtonText: 'Aceptar'
          })
        } else {
          console.log(data.rmensaje);
          Swal.fire({
            text: data.rmensaje,
            icon: 'warning',
            confirmButtonText: 'Aceptar'
          })
        }
      },
      error => {
        console.log(error);
        Swal.fire({
          title: 'Error!',
          text: error,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })
      }
    );
  }

  eliminar(req: Requerimiento): void {
    Swal.fire({
      title: '¿Esta seguro de eliminar el registro seleccionado?',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.requerimientoService.eliminar(req.id).subscribe(
          (data: OutResponse<Requerimiento>) => {
            console.log(data);
            if (data.rcodigo == 0) {
              let index = this.listaRequerimiento.indexOf(req);
              this.listaRequerimiento.splice(index, 1);
              Swal.fire({
                text: data.rmensaje,
                icon: 'success',
                confirmButtonText: 'Aceptar'
              })
            } else {
              console.log(data.rmensaje);
              Swal.fire({
                text: data.rmensaje,
                icon: 'warning',
                confirmButtonText: 'Aceptar'
              })
            }
          },
          error => {
            console.log(error);
            Swal.fire({
              title: 'Error!',
              text: error,
              icon: 'error',
              confirmButtonText: 'Aceptar'
            })
          }
        );
      }
    })
  }

  modificarData(req: Requerimiento): void {
    let finArea = this.listaArea.find(e => e.id == req.idArea);
    this.formularioModificarGrp.get('nombre').setValue(req.nombre);
    this.formularioModificarGrp.get('apellidos').setValue(req.apellidos);
    this.formularioModificarGrp.get('area').setValue(finArea);
    this.formularioModificarGrp.get('nomSolicitud').setValue(req.nomSolicitud);
    this.formularioModificarGrp.get('descSolicitud').setValue(req.descSolicitud);

    this.requerimientoMod = req;
  }

  modificar(): void {
    let req = new Requerimiento();
    req.nombre = this.formularioModificarGrp.get('nombre').value;
    req.apellidos = this.formularioModificarGrp.get('apellidos').value;
    req.idArea = this.formularioModificarGrp.get('area').value ? this.formularioModificarGrp.get('area').value.id : null;
    req.nomSolicitud = this.formularioModificarGrp.get('nomSolicitud').value;
    req.descSolicitud = this.formularioModificarGrp.get('descSolicitud').value;
    req.flgActivo = 1;

    this.requerimientoService.modificar(req, this.requerimientoMod.id).subscribe(
      (data: OutResponse<Requerimiento>) => {
        console.log(data);
        if (data.rcodigo == 0) {
          let index = this.listaRequerimiento.indexOf(this.requerimientoMod);

          data.robjeto.nombreArea = this.formularioModificarGrp.get('area').value ? this.formularioModificarGrp.get('area').value.nombre : null;
          data.robjeto.urlAnexo = this.requerimientoMod.urlAnexo;
          this.listaRequerimiento.splice(index, 1, data.robjeto);

          this.closebutton2.nativeElement.click();

          Swal.fire({
            text: data.rmensaje,
            icon: 'success',
            confirmButtonText: 'Aceptar'
          })
        } else {
          console.log(data.rmensaje);
          Swal.fire({
            text: data.rmensaje,
            icon: 'warning',
            confirmButtonText: 'Aceptar'
          })
        }
      },
      error => {
        console.log(error);
        Swal.fire({
          title: 'Error!',
          text: error,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })
      }
    );
  }

  public cargarArchivoDocAdj(event) {
    this.fileupload = event.target.files[0];
  }
}
