import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class Moviedbservice {

  private apikey:string=environment.apikey;
  private baseUrl:string="https://api.themoviedb.org/3";
  //query parameter language po ISO 639-1
  private language:string="sl-SI";
  //query parameter region po ISO 3166-1
  private region:string="SI";
  constructor(private httpClient: HttpClient) { }

  //naredi get request na api za vse žanre filmov v slovenščini, vrne observable s tabelo žanrov
  public getGenres():Observable<any>{
    const url:string=this.baseUrl+"/genre/movie/list?api_key="+this.apikey+
      "&language="+this.language;
    return this.httpClient.get<any>(url);
  }

  //naredi get request na api za vse žanre filmov v slovenščini s filtri žanrov, vrne observable s tabelo filmov
  public getFilms(genreFilters:number[]):Observable<any>{
    //genreFilters seznam id-jev žanrov, sestavimo queryParam string
    const genreFiltersQueryParam = genreFilters.length ? "&with_genres="+genreFilters.toString() : "" ;
    const url:string=this.baseUrl+"/discover/movie?api_key="+this.apikey+
      "&language="+this.language+
      "&region="+this.region+
      genreFiltersQueryParam;
    console.log(url);
    return this.httpClient.get<any>(url);
  }
}
