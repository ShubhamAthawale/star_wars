import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  charecterId :any
  profileeData:any
  constructor(public sharedServices: SharedService,private route: ActivatedRoute){

  }

  ngOnInit(): void {
   
   this.route.params.subscribe((params )=>{
    this.charecterId = params['id'];
    this.getProfileData()
   })
  
  }

  getProfileData(){
    this.sharedServices.proData.subscribe((data)=>{
      // console.log(data,"ala reeee")
      data.forEach((val:any)=>{
        let splitUrl = val.url.split('/')
        const urlID = splitUrl[splitUrl.length - 2]
      if(urlID == this.charecterId){
        this.profileeData = val
        // console.log(val,"  this.profileeData")
      }
      
      })
    })
  }
}
