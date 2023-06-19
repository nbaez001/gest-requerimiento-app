import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OutResponse } from '../dto/response/out.response';
import { Requerimiento } from '../dto/response/requerimiento';

@Injectable()
export class RequerimientoService {

  constructor(private http: HttpClient) { }

  public listar(nombre: string, apellidos: string, nomSolicitud: string): Observable<OutResponse<Requerimiento[]>> {
    return this.http.get<OutResponse<Requerimiento[]>>(`${environment.gestReqBackendUrl}/requerimiento?${nombre ? 'nombre=' + nombre : ''}${apellidos ? 'apellidos=' + apellidos : ''}${nomSolicitud ? 'nomSolicitud=' + nomSolicitud : ''}`);
  }

  public guardar(req: Requerimiento): Observable<OutResponse<Requerimiento>> {
    return this.http.post<OutResponse<Requerimiento>>(`${environment.gestReqBackendUrl}/requerimiento`, req);
  }

  public modificar(req: Requerimiento, id: number): Observable<OutResponse<Requerimiento>> {
    return this.http.put<OutResponse<Requerimiento>>(`${environment.gestReqBackendUrl}/requerimiento/${id}`, req);
  }

  public eliminar(id: number): Observable<OutResponse<any>> {
    return this.http.delete<OutResponse<any>>(`${environment.gestReqBackendUrl}/requerimiento/${id}`);
  }
}
