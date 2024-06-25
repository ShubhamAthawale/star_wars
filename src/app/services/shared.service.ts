import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  proData = new BehaviorSubject<any>([]);
  movie_Data = new BehaviorSubject<any>([]);
  filter_data = new BehaviorSubject<any>([]);

  profileData(data:any) {
    return this.proData.next(data);
  }
  
  movieData(data:any) {
    return this.movie_Data.next(data);
  }

  filterData(data:any){
    return this.filter_data.next(data);
  }
}
