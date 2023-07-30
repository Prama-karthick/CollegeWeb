import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { StudentService } from '../services/student.service';
import { ToastrService } from 'ngx-toastr';
import { PasswordsMatchValidator } from '../shared/validators/password_match_validator';

@Component({
  selector: 'app-studentregistration',
  templateUrl: './studentregistration.component.html',
  styleUrls: ['./studentregistration.component.css']
})
export class StudentregistrationComponent implements OnInit{
  sregisterForm!:FormGroup;
  isSubmitted=false;
  returnUrl='';
  notconfirm=true;
  loading!: boolean;
  details:any;
  wait: boolean=false;
  constructor(private formBuilder:FormBuilder,private studentservice:StudentService
    ,private activatedRoute:ActivatedRoute,private route:Router,private toastrservice:ToastrService){
      // if(this.studentservice.currentUser){
      //  this.route.navigateByUrl('/')
      // }
    }

  ngOnInit(): void {
    this.loading=true
      this.sregisterForm=this.formBuilder.group({
        adnumber:['',[Validators.required,Validators.minLength(5),Validators.maxLength(5)]],
        gender:['',Validators.required],
        password:['',Validators.required],
        confirmPassword: ['', Validators.required],
      },{
        validators: PasswordsMatchValidator('password','confirmPassword')
      });
      this.returnUrl=this.activatedRoute.snapshot.queryParams['returnUrl'];
      this.loading=false
    }

  get fc(){
    return this.sregisterForm.controls;
  }
  submit(){
this.isSubmitted=true
this.wait=true;
    if(this.sregisterForm.invalid){
      this.toastrservice.error("Enter the fileds Correctly")
      return
      };
    
    this.studentservice.login({adnumber:this.fc['adnumber'].value,password:this.fc['password'].value}).subscribe((res:any)=>{
      this.details=res;
      if(res['msg']!=-1){
          this.notconfirm=false;
          
      }
      else{
        this.toastrservice.error("Already Registered Admin No.");
      }
    });
    this.wait=false;
 
  }
  confirmdetails(){
    this.wait=true;
    this.studentservice.confirmregistration({adnumber:this.fc['adnumber'].value,gender:this.fc['gender'].value,password:this.fc['password'].value}).subscribe((res:any)=>{
      if(res['msg']!=-1){
      this.route.navigateByUrl("/")
      this.details=res;
    }
    else{
      this.toastrservice.error("Already Registered Admin No.");
    }
    });
    this.wait=false;
  }
}
