import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  url = "http://localhost:3000/eventos/listagem";

  constructor(private http: HttpClient) { 
  }
  public getEventos(){
    return this.http.get(`${this.url}`);
  }
}
