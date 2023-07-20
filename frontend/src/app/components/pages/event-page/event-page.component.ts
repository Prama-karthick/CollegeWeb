import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { EventService } from 'src/app/services/event.service';
import { OrderService } from 'src/app/services/order.service';
import { ProfileService } from 'src/app/services/profile.service';
import { StudentService } from 'src/app/services/student.service';
import { UserService } from 'src/app/services/user.service';
import { Events, Products } from 'src/app/shared/Product';
import { User } from 'src/app/shared/user';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.css']
})
export class EventPageComponent {
  isShow:boolean=false;
  loading!:boolean
  isgroup:boolean=false;
  isPay:boolean=false;
  eLen:number=0;
  user!:any;
  product!:Events;
  list:boolean=false;
  participantList:any[]=[];
  count:number=0;
  List:any[]=[];
  issolo!: boolean;
  rules!: string[];
  constructor(activatedRoute:ActivatedRoute,private eventservice:EventService,private cartservice:CartService,private route:Router,private userService:StudentService,private orderService:OrderService,private toastrservice:ToastrService,private profileservice:ProfileService){
    this.loading=true
    activatedRoute.params.subscribe((params)=>{
      if(params['id'])
      eventservice.getEventDetails(params['id']).subscribe(serverfood=>{
        this.product=serverfood;
        this.rules=this.product.rules
        if(this.product.id<9){
          this.isgroup=false;
          this.issolo=true;
        }
        else{
          this.isgroup=true;
          this.issolo=false;
        }
      //   if(this.product.tname==="groupevent"){
      //     this.isgroup=true;

      //   }
      // if(this.product.tname==="event"|| this.product.tname==="groupevent")
      //   {
      //     this.isShow=true;
      //   }
      })
    })
    this.user=this.userService.currentUser;
    this.isPay=this.user.isPayed;
    if(this.user.event)
    this.eLen=this.user.event.length;
    this.loading=false
  }



  participate(){
    this.loading=true
    var AdminNo=this.user.admissionNo
    if(this.user.token)
    { this.eventservice.soloevent({adminno:AdminNo,Ename:this.product.name}).subscribe((res:any)=>{
      if(res['msg']!=-1){
        this.toastrservice.success("Registered to the event successfully");
        this.route.navigateByUrl("/")
      }
      else{
        this.toastrservice.error("You have already Registered..!")
        this.route.navigateByUrl("/")
      }
    })
    }
    else{
      this.route.navigateByUrl("/login");
    }
    this.loading=false
  }
  
  checkevent(){
    this.loading=true
    var AdminNo=this.user.admissionNo
    if(this.user.token)
    {this.eventservice.setleader({adminno:AdminNo,Ename:this.product.name}).subscribe((res:any)=>{
      if(res['msg']==-1){
        this.toastrservice.error("You have already Registered..!")
        this.route.navigateByUrl("/profile")
      }
      else{
        this.toastrservice.success("Form your Team")
        this.route.navigateByUrl("/groupevent/"+this.product.id)
      }
    })
    }
    else{
      this.route.navigateByUrl("/login")
    }
    this.loading=false
  }
  // addToCart(){
  //     this.user=this.userService.currentUser;
  //     if(this.user.token){
  //       this.cartservice.addToCart(this.product);
  //       this.route.navigateByUrl('/cart-page');
  //     }
  //     else{
  //       this.route.navigateByUrl('/login');
  //     }
  // }


  // registerEvent(){
  //   this.user=this.userService.currentUser;
  //   // alert('hello');
  //   if(this.user.token){
  //     this.profileservice.registerEventss(this.product);
  //   }
  //   else{
  //     this.route.navigateByUrl("/login");
  //   }

  // }

  // eventspay(){
  // if(this.user.token){
  //   if(this.user.eventPay==false){
  //     this.profileservice.registerEventss(this.product);
  //     // this.route.navigateByUrl('/profile');
  //    }
  //  else{
  //    this.route.navigateByUrl('/');
  //    this.toastrservice.success('Participated Successfully');
  //  }

  // }
  // else{
  //   this.route.navigateByUrl('/login');
  // }

  // }

  change(){
      this.list=!this.list;
      this.eventservice.getparticipants(this.product.name).subscribe((response:any)=>{
        if(response){
          this.participantList=response;
          //this.participantList=this.List.filter(student=>student.isAdmin===false);
          this.count=this.participantList.length;
        }

      })
  }

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

}
