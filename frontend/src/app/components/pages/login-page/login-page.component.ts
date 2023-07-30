import { FatalDiagnosticError } from '@angular/compiler-cli/src/ngtsc/diagnostics';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from 'src/app/services/student.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit{
    loginForm!:FormGroup;
    loading!:boolean
    sloginForm!:FormGroup;
    isSubmitted=false;
    returnUrl='';
  wait: boolean=false;
    constructor(private formBuilder:FormBuilder,private userservice:UserService
      ,private activatedRoute:ActivatedRoute,private route:Router,private studentservice:StudentService,private toastrservice:ToastrService){
      if(this.userservice.currentUser){
        return ;
      }

      }

    // ngOnInit(): void {
    //     this.loginForm=this.formBuilder.group({
    //       email:['',[Validators.required,Validators.email]],
    //       password:['',Validators.required]
    //     });
    //     this.returnUrl=this.activatedRoute.snapshot.queryParams['returnUrl'];
    // }
    ngOnInit(): void {
      this.loading=true
      this.sloginForm=this.formBuilder.group({
        adnumber:['',[Validators.required,Validators.minLength(5),Validators.maxLength(5)]],
        password:['',Validators.required]
      });
      this.returnUrl=this.activatedRoute.snapshot.queryParams['returnUrl'];
 this.loading=false
    }

    get fc(){
      return this.sloginForm.controls;
    }
    submit(){
      this.isSubmitted=true;
      if(this.loginForm.invalid) return;
      this.userservice.login({email:this.fc['email'].value,password:this.fc['password'].value}).subscribe(()=>{
        this.route.navigateByUrl(this.returnUrl);
      })
    }

    studentlogin(){
      this.wait=true
      this.isSubmitted=true;
      if(this.sloginForm.invalid){
        this.toastrservice.show("Enter the fileds Correctly")
        return;
      }
      
      this.studentservice.studentlogin({adnumber:this.fc['adnumber'].value,password:this.fc['password'].value}).subscribe((res:any)=>{
        if(res['msg']==-2)
       { 
        this.toastrservice.error("Admin No not registered");
      }
      // else if(res['msg']==-2){
      //   this.toastrservice.error("Check your Admin No");
      // }
      else if(res['msg']==-1){
        this.toastrservice.error("Password and Admin No doesn't Not match");
      }
      else{
        this.toastrservice.success('Login Successful')
        this.route.navigateByUrl('/');
        
      }
      })
this.wait=false
    }

}


