import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TiposVO } from '../interfaces/tipos.interface';

@Injectable({
  providedIn: 'root'
})
export class EjerciciosUsuariosService {

  private API_URL = 'http://localhost:8080/api/ejerciciosUsuarios';

  constructor(private http: HttpClient) { }

  getEjercicios(): Observable<any> {
    return this.http.get(this.API_URL+"/findAll");
  }

  getById(id: number){
    let params = new HttpParams().set('id', id);
    return this.http.get(this.API_URL + "/findById", { params: params });
  }

  delete(id: number){
    let params = new HttpParams().set('id', id);
    return this.http.delete(this.API_URL + "/delete", { params: params });
  }

  save(ejercicio: any): Observable<any> {
    return this.http.post(this.API_URL + "/save", ejercicio);
  }

  saveEstado(ejercicio: any): Observable<any> {
    return this.http.post(this.API_URL + "/saveEstado", ejercicio);
  }

  getByUserId(id: number):Observable<any>{
    let params = new HttpParams().set('idUsuario', id);
    return this.http.get(this.API_URL + "/findByUser", { params: params });
  }
}