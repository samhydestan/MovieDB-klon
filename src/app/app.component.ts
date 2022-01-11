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
  baseImgUrl:string="https://image.tmdb.org/t/p/w154/";
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
  public styleCircleForGrade(grade:number){
    let color:string="green";
    const emptycolor:string="#081c22";
    let backgroundstring="";
    if(grade<7&&grade>=5){
      color="yellow";
    } else if(grade<5&&grade>=2.5){
      color="orange";
    } else if(grade<2.5){
      color="red";
    }
    //odstotek kroga, ki ga moramo narisati
    let percent=Math.round(grade*10);
    /*če >=50%, zapolnimo desno polovico (270° 50% 50%), nato zapolnimo levo polovico
     *zamik leve je ((ostanek %/50%)*180°)
     *sicer naredimo zrcaljeno
     */
    if(percent>50){
      backgroundstring+="linear-gradient(270deg, "+color+" 50%, transparent 50%), ";
      percent-=50;
      const angle=Math.round(270+percent/50*180);
      backgroundstring+="linear-gradient("+angle+"deg, "+color+" 50%, "+emptycolor+" 50%)";
    } else{
      backgroundstring+="linear-gradient(90deg, "+emptycolor+" 50%, transparent 50%), ";
      const angle=Math.round(90+percent/50*180);
      backgroundstring+="linear-gradient("+angle+"deg, "+color+" 50%, "+emptycolor+" 50%)";
    }
    console.log(grade+": "+backgroundstring);
    return {background: backgroundstring};
  }


}
