import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class Moviedbservice {

  private apikey=environment.apikey;
  constructor(private httpClient: HttpClient) { }

  //naredi get request na api za vse žanre filmov v slovenščini, vrne observable s tabelo žanrov
  public getGenres():Observable<any>{
    const url:string="https://api.themoviedb.org/3/genre/movie/list?api_key="+this.apikey+"&language=sl-SI";
    return this.httpClient.get<any>(url);
  }
}
