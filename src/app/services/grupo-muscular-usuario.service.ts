import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TiposVO } from '../interfaces/tipos.interface';

@Injectable({
  providedIn: 'root'
})
export class GrupoMuscularUsuarioService {

  private API_URL = 'http://localhost:8080/api/gm';

  constructor(private http: HttpClient) { }

  getByUserId(id: number){
    let params = new HttpParams().set('id', id);
    return this.http.get(this.API_URL + "/findByUser", { params: params });
  }

}