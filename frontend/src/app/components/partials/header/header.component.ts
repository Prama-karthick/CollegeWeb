import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { StudentService } from 'src/app/services/student.service';
import { UserService } from 'src/app/services/user.service';
import { Student } from 'src/app/shared/student';
import { User } from 'src/app/shared/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  cartQuantity=0;
  // user!:User;
  user!:Student;
  constructor(private cartservice:CartService,private userservice:StudentService){
    // this.cartservice.getCartObservable().subscribe((newcart)=>{
    //   this.cartQuantity=newcart.items.length
    // })
    userservice.userObservable.subscribe((newuser)=>{
      this.user=newuser;
    })
    if(this.user.admissionNo=="10001"){
      this.userservice.logout();
    }
  }
  ngOnInit(): void {

  }

  get isAuth(){
      return this.user.token;
  }

  logout(){
      this.userservice.logout();
  }

}
