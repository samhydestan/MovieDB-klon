import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import {FilmsPaginator} from "./films-paginator";
import { MatPaginatorModule, MatPaginatorIntl} from '@angular/material/paginator';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatPaginatorModule
  ],
  providers: [{
    provide: MatPaginatorIntl,
    useClass: FilmsPaginator
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
