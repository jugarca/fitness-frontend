import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TiposVO } from '../interfaces/tipos.interface';

@Injectable({
  providedIn: 'root'
})
export class EjercicioEstadoService {

  private API_URL = 'http://localhost:8080/api/ejercicioEstado';

  constructor(private http: HttpClient) { }

  getByUserId(id: number):Observable<any>{
    let params = new HttpParams().set('idUsuario', id);
    return this.http.get(this.API_URL + "/findByUser", { params: params });
  }
}