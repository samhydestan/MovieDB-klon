import {Component, OnInit} from '@angular/core';
import {Genre} from './genre';
import {Moviedbservice} from './moviedbservice.service';
import {Film} from "./film";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  //naslov zavihka
  title:string = 'MovieDB';
  //seznam žanrov
  genres:Genre[]=[];
  //seznam filmov
  films:Film[]=[];
  //seznam aktivnih filtrov po žanrih
  private activeGenreFilters:number[]=[];
  //baseUrl za slike posterjev filmov
  baseImgUrlDefault:string="https://image.tmdb.org/t/p/w220_and_h330_face";
  //alternativni baseUrl za slike posterjev filmov
  baseImgUrlAlt:string="https://image.tmdb.org/t/p/w440_and_h660_face";
  //baseUrl strani filmov
  baseFilmUrl:string="https://www.themoviedb.org/movie/";
  //format za zapis datumov
  private dateFormat:Intl.DateTimeFormat=new Intl.DateTimeFormat("sl-SI",{
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

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
    const genreListItem:HTMLElement|null=document.getElementById("genre"+genre.id);
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

  //pretvori zapis datuma v slovenskega
  public transformDate(date:string):string{
    const dateobject=new Date(date);
    return this.dateFormat.format(dateobject);
  }

  //določi slog kroga za vsako oceno
  public styleRingForGrade(grade:number):string{
    let color:string="green";
    if(grade<7&&grade>=5){
      color="yellow";
    } else if(grade<5&&grade>=2.5){
      color="orange";
    } else if(grade<2.5){
      color="red";
    }
    //background-image=conic-gradient(barva 0% ocena%, prazno 0% 100%) : tortni diagram z ocena% barve
    return "conic-gradient("+color+" 0% "+Math.round(grade*10)+"%, #081c22 0% 100%)";
  }
}
