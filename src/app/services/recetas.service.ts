import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RecetaVO } from '../interfaces/receta.interface';

@Injectable({
  providedIn: 'root'
})
export class RecetasService {

  private API_URL = 'http://localhost:8080/api/recetas';

  constructor(private http: HttpClient) { }

  getRecetas(): Observable<any> {
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

  save(tipo: RecetaVO): Observable<any> {
    return this.http.post(this.API_URL + "/save", tipo);
  }
}