import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }
  get<T>(endpoint:string):Observable<T>{
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`);
  }
  getById<T>(endpoint:string,id:number):Observable<T>{
    return this.http.get<T>(`${this.baseUrl}/${endpoint}/${id}`);
  }
  add<T>(endpoint:string, data:T):Observable<T>{
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, data);
  }
  update<T>(endpoint:string, id:number, data:T):Observable<T>{
    return this.http.put<T>(`${this.baseUrl}/${endpoint}/${id}`, data);
  }
  delete<T>(endpoint:string, id:number):Observable<T>{
    return this.http.delete<T>(`${this.baseUrl}/${endpoint}/${id}`);
  }
  

  
}
