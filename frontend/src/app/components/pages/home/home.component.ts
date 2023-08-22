import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs';
import { EventService } from 'src/app/services/event.service';
import { Events, Products } from 'src/app/shared/Product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  gproducts!:Events[];
  loading!:boolean
  soloeventss!:Events[];
  workshopss!:Events[];
  groupevents!:Events[];
  groupname: any;
  showsoloevents: boolean=true;
  showgroupevents: boolean=true;
  
  constructor(activatedRoute:ActivatedRoute,eventservice:EventService){
    window.scroll(0,0)
    this.loading=true
    activatedRoute.params.subscribe((params)=>{
      this.groupname=params['groupname']
      if(params['groupname'])
      eventservice.getEventByGroup(params['groupname']).subscribe(res=>{
        this.workshopss=res;
        if(this.groupname=="group1"){
        this.gproducts=this.workshopss.filter(product=>product.eventday='day1')
      }
      else{
        this.gproducts=this.workshopss.filter(product=>product.eventday='day2')
      }
        this.soloeventss=this.gproducts.filter(product=>product.id < 12);
        // this.workshopss=this.gproducts.filter(product=>product.id==="workshop");
         this.groupevents=this.gproducts.filter(product=>product.id > 11);

      })
    })

    // if(this.groupname=='group1'){
    //   this.showsoloevents=true;
    //   this.showgroupevents=false;
    // }
    // if(this.groupname=='group2'){
    //   this.showsoloevents=false;
    //   this.showgroupevents=true;
    // }

    
  this.loading=false
  }
  ngOnInit(): void {

  }
}
