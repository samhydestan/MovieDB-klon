import {Component, OnInit} from '@angular/core';
import { Genre } from './genre';
import {Moviedbservice} from './moviedbservice.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title:string = 'MovieDB';
  genres:Genre[]=[];

  constructor(private mdbservice:Moviedbservice){}

  //ob nalaganju strani poizvedemo po obstoječih žanrih
  ngOnInit(){
    this.mdbservice.getGenres().subscribe((genredata:any)=>{
        this.genres=genredata.genres;
      }
    );
  }

  public onGenreClick(genre:any): void{
    console.log(genre);
  }
}
