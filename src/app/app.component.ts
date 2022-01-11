import {Component, OnInit} from '@angular/core';
import { Genre } from './genre';
import {Moviedbservice} from './moviedbservice.service';
import {Film} from "./film";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title:string = 'MovieDB';
  //seznam žanrov
  genres:Genre[]=[];
  //seznam filmov
  films:Film[]=[];
  //seznam aktivnih filtrov po žanrih
  activeGenreFilters:number[]=[];
  //baseUrl za slike posterjev filmov
  baseImgUrl:string="https://image.tmdb.org/t/p/w154";

  constructor(private mdbservice:Moviedbservice){}

  //ob nalaganju strani poizvedemo po obstoječih žanrih in priljubljenih filmih
  //vrstni red poizvedb ni pomemben
  ngOnInit(){
    this.mdbservice.getGenres().subscribe((genredata:any)=>{
        this.genres=genredata.genres;
    });
    this.getFilms(false);
  }

  //asinhrona poizvedba po filmih s trenutnimi filtri žanra
  private getFilms(getMore:boolean): void{
    this.mdbservice.getFilms(this.activeGenreFilters).subscribe((data:any)=>{
      if(getMore){

      } else{
        this.films=data.results;
        this.films.forEach((i)=>console.log(i.title));
      }
    });
  }

  //ob kliku na žanr se ga doda ali odstrani iz seznama filtrov, posodobi slog li značke, znova poizve po filmih
  public onGenreClick(genre:Genre): void{
    const index:number=this.activeGenreFilters.indexOf(genre.id);
    const genreListItem=document.getElementById("genre"+genre.id);
    if(index===-1){
      this.activeGenreFilters.push(genre.id);
      if(genreListItem!=null){
        genreListItem.style.backgroundColor="dodgerblue";
        genreListItem.style.color="white";
      }
    } else{
      this.activeGenreFilters.splice(index,1);
      if(genreListItem!=null){
        genreListItem.style.backgroundColor="white";
        genreListItem.style.color="black";
      }
    }
    this.getFilms(false);
  }
}
