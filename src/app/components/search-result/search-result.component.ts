import { Component, OnChanges, OnInit ,SimpleChanges } from '@angular/core';
import { StarWarsService } from 'src/app/services/star-wars.service';
import { NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit, OnChanges  {
  peopleData: any = [];
  peopleDataToShow: any;
  page = 1;
  pageSize = 5;
  collectionSize: any;
  CheckPeopleNextNull = false;
  speciesData:any = [];
  moviesData:any =[];
  vehicalData:any=[];
  starShipData:any=[]
  sharedPeopleData:any=[]
  isLoader:boolean =true


  constructor(public service: StarWarsService,public shareService :SharedService) {
    this.refreshData()
  }

  ngOnInit(): void {
    this.getMovies()
    this.getSpecies()
    this.getVehicals() 
    this.getSatrship()
    this.getFilteredData()
  }

  getPeople(i=1){
    this.service.getPeopelsByPage(i).subscribe((data: any) => {  
      this.sharedPeopleData.push(data)
      if (data.next !== null) {
        this.getPeople(i+1)
      }
      else{
        this.searchResutToShow(this.sharedPeopleData)
      }
      
    })
  }

  getSpecies(i=1){
    this.service.getSpeciesByPage(i).subscribe((data: any) => {
      data.results.forEach((res: any) => {
        this.speciesData.push(res)
      })
      if (data.next !== null) {
        this.getSpecies(i+1)
      }
    })
  }

  getVehicals(i=1){
    this.service.getVehicals(i).subscribe((data: any) => {
      data.results.forEach((res: any) => {
        this.vehicalData.push(res)
      })
      if (data.next !== null) {
        this.getVehicals(i+1)
      }
    })
  }

  getSatrship(i=1){
    this.service.getStarShip(i).subscribe((data: any) => {
      data.results.forEach((res: any) => {
        this.starShipData.push(res)
      })
      if (data.next !== null) {
        this.getSatrship(i+1)
      }
    })
  }

  getMovies(){
    this.service.getMovies().subscribe((data: any) => {
      this.moviesData = data.results    
      this.getPeople()          
    })
  }

  searchResutToShow(dataarr:any){
    dataarr.forEach((data:any)=>{
      data.results.forEach((res: any) => {  
          res.speciesName = "unknown"
          res.filmDone = [];
          res.vehicalData = [];
          res.starShipData = [];
          this.speciesData.forEach((speRes:any)=>{        
            if(res.species[0] == speRes.url){
              res.speciesName = speRes.name
            }
          })
          res.films?.forEach((pepfilmRes:any)=>{
            this.moviesData.forEach((movData:any)=>{
              if(pepfilmRes == movData.url){
                res.filmDone.push(movData)
              }
            })
          })
          res.starships?.forEach((pepStartShipRes:any)=>{
            this.starShipData.forEach((starShipRes:any)=>{
              if(pepStartShipRes == starShipRes.url){
                res.starShipData.push(starShipRes)
              }
            })
          })
          res.vehicles?.forEach((pepVehicalRes:any)=>{
            this.vehicalData.forEach((vehicalres:any)=>{
              if(pepVehicalRes == vehicalres.url){
                res.vehicalData.push(vehicalres)
              }
            })
          })
          this.peopleData.push(res)        
        })
    })
    this.collectionSize = this.peopleData.length
    this.peopleDataToShow = this.peopleData;
    this.refreshData()
    this.shareService.profileData(this.peopleData)
    this.shareService.movieData(this.moviesData)
    if(this.peopleData.length > 0){
      this.isLoader = false
    }
  }

  refreshData() {
    this.peopleDataToShow = this.peopleData.map((people: any, i: any) => ({ id: i + 1, ...people })).slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize,
    );
  }

  getFilteredData(){
    this.shareService.filter_data.subscribe((data:any)=>{
      this.isLoader = true;
      setTimeout(() => {     
        if(data.length > 0){
          this.isLoader = false  
          this.peopleData = data
          this.collectionSize = this.peopleData.length
          this.peopleDataToShow = this.peopleData;
          this.refreshData()
        }
      }, 1000);
    
    })

  }

  ngOnChanges(changes: SimpleChanges): void {
    // if (changes['filterData']) {
    //   this.getFilteredData();
    // }
  }
}
