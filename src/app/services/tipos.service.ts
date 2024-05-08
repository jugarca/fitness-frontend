import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TiposVO } from '../interfaces/tipos.interface';

@Injectable({
  providedIn: 'root'
})
export class TiposService {

  private API_URL = 'http://localhost:8080/api/tipos';

  constructor(private http: HttpClient) { }

  getTipos(): Observable<any> {
    return this.http.get(this.API_URL+"/findAll");
  }

  getById(codigo: string){
    let params = new HttpParams().set('codigo', codigo);
    return this.http.get(this.API_URL + "/findById", { params: params });
  }

  delete(codigo: string){
    let params = new HttpParams().set('codigo', codigo);
    return this.http.delete(this.API_URL + "/delete", { params: params });
  }

  save(tipo: TiposVO): Observable<any> {
    return this.http.post(this.API_URL + "/save", tipo);
  }
}