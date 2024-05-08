import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RandomUserService {


  //Uso de un API para crear perfil ficticios.  
  private API_URL = 'https://randomuser.me/api/';

  constructor(private http: HttpClient) { }

  getUser(): Observable<any> {
    return this.http.get(this.API_URL);
  }

}