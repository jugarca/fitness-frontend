import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { RecetaVO } from "../interfaces/receta.interface";
import { RecetasAlimentosVO } from "../interfaces/recetas-ingredientes.interface";

@Injectable({
    providedIn: 'root'
  })
  export class RecetasIngredientesService {
  
    private API_URL = 'http://localhost:8080/api/recetas-alimentos';
  
    constructor(private http: HttpClient) { }

    getByReceta(idReceta: number): Observable<any>{
        let params = new HttpParams().set('idReceta', idReceta);
        return this.http.get(this.API_URL + "/findByReceta", { params: params });
    }
   
    delete(id: number){
      let params = new HttpParams().set('id', id);
      return this.http.delete(this.API_URL + "/delete", { params: params });
    }
  
    save(tipo: RecetasAlimentosVO): Observable<any> {
      return this.http.post(this.API_URL + "/save", tipo);
    }
  }