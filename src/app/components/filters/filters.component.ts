import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  filterForm:any
  profileData:any
  profileDataForFilter:any
  allFilms:any
  allSpecies:any =[]
  allVehicals:any =[]
  allStarshipData:any =[]
  allBirthYearData:any =[]
  handleMovieName:any=[]
  handleSpecies:any=[]
  handleBirtYear:any=[]
  handleStarship:any=[]
  handleVehicals:any=[]
  filteredData:any=[]
  uniqueFilterData = new Set()

  constructor(public sharedServices: SharedService){}

  ngOnInit(): void {
    this.getDataForFilter()
    this.getMovieData()

    this.filterForm = new FormGroup({
      movieName: new FormControl([]),
      species: new FormControl([]),
      vehicals: new FormControl([]),
      starship: new FormControl([]),
      birthYear: new FormControl([]),
    }) 
  }

  handleCheckForMovie(e:any){
    if(e.target.checked){
      this.handleMovieName.push(e.target.value)
    }
   
  }

  handleCheckForBirtYear(e:any){
    if(e.target.checked){
      this.handleBirtYear.push(e.target.value)
    }
  }

  handleCheckForStarShips(e:any){
    if(e.target.checked){
      this.handleStarship.push(e.target.value)
    }
  }

  handleCheckForVehicals(e:any){
    if(e.target.checked){
      this.handleVehicals.push(e.target.value)
    }
  }

  handleCheckForSpecies(e:any){
    if(e.target.checked){
      this.handleSpecies.push(e.target.value)
    }
  }

  submitForm(){
    this.filterForm.controls['movieName'].setValue(this.handleMovieName)
    this.filterForm.controls['species'].setValue(this.handleSpecies)
    this.filterForm.controls['vehicals'].setValue(this.handleVehicals)
    this.filterForm.controls['starship'].setValue(this.handleStarship)
    this.filterForm.controls['birthYear'].setValue(this.handleBirtYear)
    this.applyFilter(this.filterForm.value)
  }

  applyFilter(filterCriteria:any){
    this.uniqueFilterData.clear()
    // console.log(filterCriteria,"filterCriteria")
    // console.log(this.profileDataForFilter,"profileDataForFilter")
    this.profileDataForFilter.forEach((character:any)=>{
      
      // movieName
      if(filterCriteria.movieName.length > 0){
        filterCriteria.movieName.forEach((filtr_moive:any)=>{
          character.filmDone.forEach((movie:any)=>{          
            if(movie.title == filtr_moive){
              this.uniqueFilterData.add(character)
            }
          })
        })
      }

      // species
      if(filterCriteria.species.length > 0){
        filterCriteria.species.forEach((species:any)=>{          
            if(species == character.speciesName){
              this.uniqueFilterData.add(character)
            }
        })
      }

      // birthYear
      if(filterCriteria.birthYear.length > 0){
        filterCriteria.birthYear.forEach((year:any)=>{          
            if(year == character.birth_year){
              this.uniqueFilterData.add(character)
            }
        })
      }

      // starship
      if(filterCriteria.starship.length > 0){
        filterCriteria.starship.forEach((star_ship:any)=>{
          character.starShipData.forEach((star:any)=>{          
            if(star.name == star_ship){
              this.uniqueFilterData.add(character)
            }
          })
        })
      }

      // vehicals
      if(filterCriteria.vehicals.length > 0){
        filterCriteria.vehicals.forEach((vehical:any)=>{
          character.vehicalData.forEach((vehical_data:any)=>{          
            if(vehical_data.name == vehical){
              this.uniqueFilterData.add(character)
            }
          })
        })
      }

    })
    this.filteredData = Array.from(this.uniqueFilterData);
    this.profileDataForFilter = this.filteredData;
    this.sharedServices.filterData(this.filteredData);
    this.handleMovieName = []
    this.handleSpecies = []
    this.handleBirtYear = []
    this.handleStarship = []
    this.handleVehicals = []
    this.filterForm.reset()
  }

  getMovieData(){
    this.sharedServices.movie_Data.subscribe((data:any)=>{
      this.allFilms = data
    })
  }

  getDataForFilter(){
    this.sharedServices.proData.subscribe((data:any)=>{
      this.profileData = data
      this.profileDataForFilter = data
      const speciesData:any = []
      const vehicalData:any = []
      const starshipdata:any = []
      const birthYear:any = []
      this.profileData.forEach((item:any)=>{
        speciesData.push(item.speciesName)
        birthYear.push(item.birth_year)
        item.vehicalData.forEach((val:any)=>{
          vehicalData.push(val.name)
        })
        item.starShipData.forEach((val:any)=>{
          starshipdata.push(val.name)
        })
      })
      this.allSpecies = [...new Set(speciesData.filter((item:any) => item !== 'unknown'))];
      this.allVehicals = [...new Set(vehicalData.filter((item:any) => item))];
      this.allStarshipData = [...new Set(starshipdata.filter((item:any) => item))];
      this.allBirthYearData = [...new Set(birthYear.filter((item:any) => item))];
    })
  }
  
  resetFilter(){
    this.handleMovieName = []
    this.handleSpecies = []
    this.handleBirtYear = []
    this.handleStarship = []
    this.handleVehicals = []
    this.filterForm.reset()
    this.sharedServices.filterData(this.profileData);
  }
}
