import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Area } from '../dto/response/area';
import { OutResponse } from '../dto/response/out.response';

@Injectable()
export class AreaService {

  constructor(private http: HttpClient) { }

  public listarArea(): Observable<OutResponse<Area[]>> {
    return this.http.get<OutResponse<Area[]>>(`${environment.gestReqBackendUrl}/area/listar`);
  }
}
