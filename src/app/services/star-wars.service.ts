import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class StarWarsService {

  url = "https://swapi.dev/api/"

  constructor( public http:HttpClient) { }

  getPeopelsByPage(pageCount:number){
    return this.http.get(this.url+"people/?page=" + pageCount )
  }

  getSpeciesByPage(pageCount:number){
    return this.http.get(this.url+"species/?page=" + pageCount )
  }

  getMovies(){
    return this.http.get(this.url+"films")
  }

  getStarShip(pageCount:number){
    return this.http.get(this.url+"starships/?page=" + pageCount )
  }

  getVehicals(pageCount:number){
    return this.http.get(this.url+"vehicles/?page=" + pageCount )
  }
}
