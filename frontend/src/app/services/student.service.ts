import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { REGISTER_STUDENT, SEARCH_STUDENT, STUDENT_LOGIN, USER_LOGIN } from '../shared/constants/urls';
import { IUserLogin } from '../shared/interfaces/IuserLogin';
import { Interfaces, RegInterfaces } from '../studentLogin/shared/interfaces';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Student } from '../shared/student';
@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private userSubject=new BehaviorSubject<Student>(this.getUserFromLocal());
  public userObservable:Observable<Student>;
  userevents!: string[];
  userteams!: string[];
  admin!:boolean;
  studentin: boolean=false;
  constructor(private http:HttpClient,private toastrservice:ToastrService) { 
    this.userObservable=this.userSubject.asObservable();
  }

  public get currentUser():Student{
    return this.userSubject.value;
  }

  login(studentLogin:Interfaces):Observable<any>{
     return  this.http.post<any>(SEARCH_STUDENT, studentLogin).pipe(
      tap({
        next:(user)=>{
          this.toastrservice.success('Check Your Details')
        },
        error:(errorResponse)=>{
          this.toastrservice.error(errorResponse.error,'Check your Admission Number')
        }
      })
    );
  }

  confirmregistration(studentLogin:RegInterfaces):Observable<any>{
     
    return  this.http.post<any>(REGISTER_STUDENT, studentLogin).pipe(
      tap({
        next:(user)=>{
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrservice.success(`${user.name}`,'Register Successful')
          
        },
        error:(errorResponse)=>{
          this.toastrservice.error(errorResponse.error,'Register Failed')
        }
      })
    );
  }


  studentlogin(studentLogin:Interfaces):Observable<any>{

    return  this.http.post<any>(STUDENT_LOGIN, studentLogin).pipe(
      tap({
        next:(user)=>{
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);

        },
        error:(errorResponse)=>{
          this.toastrservice.error(errorResponse.error,'Login Failed')
        }
      })
    );
  }

  logout(){
    this.userSubject.next(new Student());
    localStorage.removeItem('User');
    localStorage.removeItem('Prouser');
    // this.cartService.clearCart();
    window.location.reload();
    this.studentin=false;
  }
  loggedin(){
    this.studentin=true;
  }
  get loginstatus(){
    return this.studentin;
  }
  get events(){
    return this.userevents
  }
  get teams(){
    return this.userteams
  }

  setadminstatus(){
    this.admin=true;
  }

  get adminstatus(){
    return this.admin;
  }

  addevents(eventname:string){
    if(this.currentUser.event)
    {this.userevents=this.currentUser.event}
   
    this.userevents.push(eventname);

  }
  addteams(tname:string){
    if(this.currentUser.yourteams)
    {this.userteams=this.currentUser.yourteams}
   
    this.userteams.push(tname);

  }

  private setUserToLocalStorage(user:any){

    localStorage.setItem('User',JSON.stringify(user));
    localStorage.setItem('Prouser',JSON.stringify(user));
  }

  private getUserFromLocal():any{
    const userjson=localStorage.getItem('User');
    return userjson?JSON.parse(userjson):new Student();
  }
}
