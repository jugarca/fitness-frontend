import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TiposVO } from '../interfaces/tipos.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private API_URL = 'http://localhost:8080/api/user';

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<any> {
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

  save(user: any): Observable<any> {
    return this.http.post(this.API_URL + "/save", user);
  }
}