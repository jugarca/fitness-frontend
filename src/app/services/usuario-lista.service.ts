import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TiposVO } from '../interfaces/tipos.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioListaService {

  private API_URL = 'http://localhost:8080/api/usuarioLista';

  constructor(private http: HttpClient) { }

  getEjercicios(): Observable<any> {
    return this.http.get(this.API_URL+"/findAll");
  }

  save(usuarioMenu: any): Observable<any> {
    return this.http.post(this.API_URL + "/save", usuarioMenu);
  }

  saveEstado(usuarioMenu: any): Observable<any> {
    return this.http.post(this.API_URL + "/saveEstado", usuarioMenu);
  }

  getByUserId(id: number):Observable<any>{
    let params = new HttpParams().set('idUsuario', id);
    return this.http.get(this.API_URL + "/findByUser", { params: params });
  }
}