import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { delay } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { EventService } from 'src/app/services/event.service';
import { OrderService } from 'src/app/services/order.service';
import { ProfileService } from 'src/app/services/profile.service';
import { StudentService } from 'src/app/services/student.service';
import { UserService } from 'src/app/services/user.service';
import { ITeamInterface } from 'src/app/shared/interfaces/ITeamInterface';
import { Events, Products } from 'src/app/shared/Product';
import { Student } from 'src/app/shared/student';
import { User } from 'src/app/shared/user';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-team-page',
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.css']
})
export class TeamPageComponent implements OnInit {
    isPay:boolean=false;
    eLen:number=0;
    user!:Student;
    product!:Events;
    TeamForm!:FormGroup;
    eventTitle!:string;
    list:boolean=false;
    List:any[]=[];
    payList:any[]=[];
    participantList:any[]=[];
    count:number=0;
  noParticipants: boolean=false;
  taketime: boolean=false;
    constructor(private formBuilder:FormBuilder,private userservice:StudentService      
      ,private activatedRoute:ActivatedRoute,private profileservice:ProfileService,private route:Router,private cartservice:CartService,private eventservice:EventService,
      private orderService:OrderService,private toastrservice:ToastrService){
        window.scroll(0,0);
        activatedRoute.params.subscribe((params)=>{
          if(params['id']){
            eventservice.getEventDetails(params['id']).subscribe(serverfood=>{
              this.product=serverfood;
              this.eventTitle=this.product.name;
        })
      }
    })

    
    this.user=this.userservice.currentUser;
   // this.isPay=this.user.isPayed;
    if(this.user.event)
    this.eLen=this.user.event.length;
  }


      ngOnInit(): void {
          // this.TeamForm=this.formBuilder.group({
          //   eventname:[''],
          //   teamName:['',Validators.required],
          //   teammem1:[''],
          //   email1:[''],
          //   teammem2:[''],
          //   email2:['',Validators.email],
          //   teammem3:[''],
          //   email3:['',Validators.email],
          //   teammem4:[''],
          //   email4:['',Validators.email],
          //   teammem5:[''],
          //   email5:['',Validators.email],
          //   teammem6:[''],
          //   email6:['',Validators.email]
          // })
      }


      // addToCart(){
      //   if(this.TeamForm.invalid) return;
      //   const fv= this.TeamForm.value;
      //   const team :ITeamInterface = {
      //     eventname:this.eventTitle,
      //     teamName: fv.teamName,
      //     teammem1:this.user.name,
      //     email1:this.user.email,
      //     teammem2:fv.teammem2,
      //     email2:fv.email2,
      //     teammem3:fv.teammem3,
      //     email3:fv.email3,
      //     teammem4:fv.teammem4,
      //     email4:fv.email4,
      //     teammem5:fv.teammem5,
      //     email5:fv.email5,
      //     teammem6:fv.teammem6,
      //     email6:fv.email6
      //   };

      //   this.orderService.checkgroup(team).subscribe((response)=>{
      //     if(response.length){
      //       this.toastrservice.error("Team members "+response.toString()+" are not registered");
      //     }
      //     else{
      //       this.orderService.registerGroup(team).subscribe((result)=>{
      //         console.log(result);

      //       })
      //       this.user=this.userservice.currentUser;
      //       if(this.user.token){

      //         this.cartservice.addToCart(this.product);
      //         this.route.navigateByUrl('/cart-page');
      //       }
      //       else{
      //         this.route.navigateByUrl('/login');
      //       }

      //     }
      //   })
      // }
    //   registerEvents(){
    //     if(this.TeamForm.invalid) return;
    //     const fv= this.TeamForm.value;
    //     const team :ITeamInterface = {
    //       eventname:this.eventTitle,
    //       teamName: fv.teamName,
    //       teammem1:this.user.name,
    //       email1:this.user.email,
    //       teammem2:fv.teammem2,
    //       email2:fv.email2,
    //       teammem3:fv.teammem3,
    //       email3:fv.email3,
    //       teammem4:fv.teammem4,
    //       email4:fv.email4,
    //       teammem5:fv.teammem5,
    //       email5:fv.email5,
    //       teammem6:fv.teammem6,
    //       email6:fv.email6
    //     };

    //     // this.orderService.groupr(team).subscribe((result)=>{
    //     //   console.log(result);
    //     // })
		// this.orderService.checkgroup(team).subscribe((response)=>{
    //       if(response.length){
    //         this.toastrservice.error("Team members "+response.toString()+" are not registered");

    //       }
    //       else{
		//   this.profileservice.registerGroupEvents(this.product).subscribe((response:any)=>{
    //     if(response['msg']!=-1){
		//       this.orderService.registerGroup(team).subscribe((result)=>{
    //           console.log(result);

    //         })

    //         this.toastrservice.success('Register Successful');
    //         this.route.navigateByUrl('/profile');
    //     }
    //       else{
    //         this.toastrservice.error('Already you have registered');
		// 	      this.route.navigateByUrl('/profile');
    //       }
		//   });

    //     }

    //        });
    // }


    // change(){
    //   this.list=!this.list;
    //   this.orderService.getTeams(this.product).subscribe((response:any)=>{
    //     if(response){
    //       this.List=response.team;
    //       this.payList=response.paylists;
    //       this.count=this.List.length;
    //     }
    //   })
    // }
  exportToExcel()
  {

    let element = document.getElementById('list');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    let fileName = this.product.name+".xlsx"

    /* save to file */
    XLSX.writeFile(wb, fileName);

 }

//  exportToExcelPay(){
//   let element = document.getElementById('paymentlist');
//   const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

//   /* generate workbook and add the worksheet */
//   const wb: XLSX.WorkBook = XLSX.utils.book_new();
//   XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
//   let fileName = this.product.name+"_pay"+".xlsx"

//   /* save to file */
//   XLSX.writeFile(wb, fileName);

//  }

open(){
  this.list=true;
  this.taketime=true;
  this.noParticipants=false;
  this.eventservice.getgroupparticipants(this.product.name).subscribe((response:any)=>{
    if(response['msg']==-1){
      
    //  console.log("Event page returns::"+response)
      //this.participantList=this.List.filter(student=>student.isAdmin===false);
      this.count=0;
    }
    else{
      console.log(response);
      this.participantList=response;
    //  console.log("Event page returns::"+response)
      //this.participantList=this.List.filter(student=>student.isAdmin===false);
     this.count=this.participantList.length;
    }

  })
  delay(5000);
  this.taketime=false
  if(this.count==0){
    //this.noParticipants=true;
    //this.list=false;
  }
  else{
    this.taketime=false
  }
}

}



