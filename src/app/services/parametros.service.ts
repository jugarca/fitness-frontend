import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ValoresTipoVO } from '../interfaces/valoresTipos.interface';

@Injectable({
  providedIn: 'root'
})
export class ParametrosService {

  private API_URL = 'http://localhost:8080/api/valoresTipo';

  constructor(private http: HttpClient) { }

  getParametros(): Observable<any> {
    return this.http.get(this.API_URL+"/findAll");
  }

  getByTipo(tipo: string): Observable<any>{
    let params = new HttpParams().set('tipo', tipo);
    return this.http.get(this.API_URL + "/findByTipo", { params: params });
  }

  delete(parametro: ValoresTipoVO){
    return this.http.post(this.API_URL + "/delete",parametro);
  }

  save(parametro: ValoresTipoVO): Observable<any> {
    return this.http.post(this.API_URL + "/save", parametro);
  }
}