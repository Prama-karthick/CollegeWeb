import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EventService } from 'src/app/services/event.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-participates',
  templateUrl: './participates.component.html',
  styleUrls: ['./participates.component.css']
})
export class ParticipatesComponent implements OnInit {


  eventDetails={
    "eventsList": [{
      id: "0",
      name: "As You Like It",
    },{
      id: "1",
      name: "Best Manager",
    },{
      id: "2",
      name: "Solo Dance",
     
    },{
      id: "3",
      name: "Solo Singing",
    },{
      id: "4",
      name: "Solo Instrumental",
    },{
      id: "5",
      name: "Pixie",
     
    },{
      id: "6",
      name: "Pencil Sketching",
     
    },{
      id: "7",
      name: "Yoga",
     
    },{
      id: "8",
      name: "Ezhuthaani",
      
    },{
      id: "9",
      name: "Divide and Conquer",
      minNumberOfParticipates: 5,
      maxNumberOfParticipates: 5
    },{
      id: "10",
      name: "Treasure hunt",
      minNumberOfParticipates: 5,
      maxNumberOfParticipates: 5
      
    },{
      id: "11",
      name: "Monsters’ Muss",
      minNumberOfParticipates: 2,
      maxNumberOfParticipates: 2
    },{
      id: "12",
      name: "Radio Mirchi",
      minNumberOfParticipates: 1,
      maxNumberOfParticipates: 3
    },{
      id: "13",
      name: "Potpourri",
      minNumberOfParticipates: 3,
      maxNumberOfParticipates: 3
    },{
      id: "14",
      name: "Lyrical Hunt",
      minNumberOfParticipates: 3,
      maxNumberOfParticipates: 3
    },{
      id: "15",
      name: "Sherlock Holmes",
      minNumberOfParticipates: 2,
      maxNumberOfParticipates: 2
    },{
      id: "16",
      name: "Cinematrix (Short Flim)",
      minNumberOfParticipates: 5,
      maxNumberOfParticipates: 8
    },{
      id: "17",
      name: "Quiz",
      minNumberOfParticipates: 2,
      maxNumberOfParticipates: 2
    },{
      id: "18",
      name: "Group Dance",   
      minNumberOfParticipates: 4,
      maxNumberOfParticipates: 15
    },{
      id: "19",
      name: "Poster Making",
      minNumberOfParticipates: 2,
      maxNumberOfParticipates: 2
    },{
      id: "20",
      name: "Rangoli",
      minNumberOfParticipates: 2,
      maxNumberOfParticipates: 3
    },{
      id: "21",
      name: "Dramatix",
      minNumberOfParticipates: 4,
      maxNumberOfParticipates: 10
    }]
  };

  constructor(private fb: FormBuilder,private route: ActivatedRoute, 
    private router: Router, private studentservice: StudentService,
    private eventservice:EventService,private toastrservice:ToastrService) { 

      // this.name="EVENT NAME";
      // this.Linstructions="Team leader will be participant 1"
      // this.L2instructions="MAX participants should be 10"
      // this.instructionsMax="Max instructions"
      // this.instructions="demo instructions for designing"
      // this.addParticipantDisplay=true

    }

  participantForm= new FormGroup({
    teamname:new FormControl('',[Validators.required]),
    participants: new FormArray([]),
    event: new FormControl()
  })

  get participants() {
    return (<FormArray>this.participantForm.get('participants')).controls;
  }

  name=""
  msg="";
  error="";
  public success = false;
  public alert= false;
  public afterForm= true;
  public TeamNameDisplay= false;
  public addParticipantDisplay= false;
  public loading= false;
  instructions= ""
  instructionsMax=""
  Linstructions=""
  L2instructions=""
  id:any;
  data:any;

  userDetail: any;
  yourEvents: string="";
  ngOnInit(): void {

    this.loading=true
    window.scroll(0,0);
    this.id= this.route.snapshot.params["id"];
    this.data= this.eventDetails.eventsList[this.id];

    // if(this.id==10){
    //   const redirectUrl = '/event/'+ this.id;
    //   // Redirect the user
    //   this.router.navigate([redirectUrl]);
    //   return;
    // }
    this.userDetail=this.studentservice.currentUser
    // this.myDb.getUserDetails().subscribe((response: any)=>{
    //   this.userDetail= response["userDetails"]
     this.yourEvents= this.userDetail.event

      if(this.yourEvents.includes(this.name)){
        this.msg= "You have Already Registered for this event"
        this.alert=false;
        this.success=true;
        this.afterForm= false;
      }
    
      //var min=this.data["minNumberOfParticipates"]
       var min=2
    this.Linstructions= "Participant 1 will Consider as the Team Leader";
    this.L2instructions= "Team Leader should have an account in the Fiesta'23"

    this.name= this.data["name"];
    if(this.data["minNumberOfParticipates"]==this.data["maxNumberOfParticipates"]){
      this.instructions = "The Team can have atmost "+this.data["maxNumberOfParticipates"]+" participants";
      this.instructionsMax= "Fill in all the details";
    }
    else{
      this.instructions = "The minimum Number of participants need is "+ this.data["minNumberOfParticipates"];
      this.instructionsMax= "The maximum Number of participants allowed is " + this.data["maxNumberOfParticipates"];
      this.addParticipantDisplay=true;
    }

    for (var i = 0; i < min; i++) {
      this.addParticipant()
    }

    this.loading=false
  }

  undoactions(){
    //this.router.navigateByUrl("/groupevent/"+this.data.id);
    if(this.n>this.data.minNumberOfParticipates)
     {     this.n=this.n-1;
      (<FormArray>this.participantForm.get('participants')).removeAt(-1);
    }
    else
      this.toastrservice.show("Minimum Participants Needed")
  }

  n: number=0;
  addParticipant(){
    this.loading=true
    this.n= this.n+1
    if(this.n<this.data["maxNumberOfParticipates"]){
      const participant= new FormGroup({
        admissionNo: new FormControl('', [Validators.required]),
      });
      (<FormArray>this.participantForm.get('participants')).push(participant);
    }
    else if(this.n==this.data["maxNumberOfParticipates"]){
      const participant= new FormGroup({
        admissionNo: new FormControl('', [Validators.required]),
      });
      (<FormArray>this.participantForm.get('participants')).push(participant);
      this.addParticipantDisplay=false;

    }
    else{
      this.addParticipantDisplay=false;
    }
    this.loading=false
  }

  public wait= false
  participate(){
    if(!this.participantForm.valid){
      window.scroll(0,0);
      this.alert= true;
      this.toastrservice.error("Fill in all details");
      return
    }
    this.alert= false;
    this.participantForm.value.event=this.id
    this.wait= true;
    this.loading= true;
    this.eventservice.participates(this.participantForm.value).subscribe((response: any)=>{
      if(response["message"]==-1){
        const redirectUrl = '/login';
        // Redirect the user
        this.router.navigate([redirectUrl], {queryParams: { expired: 'true' } });
      }
      else if(response["message"]==0){
        const redirectUrl = '/login';
        // Redirect the user
        this.router.navigate([redirectUrl], {queryParams: { expired: 'true' } });
      }
      else if(response["message"]==-2){
        window.scroll(0,0);
        this.toastrservice.error("No two different genders participate together")
        this.alert=true;
        this.wait= false;
        this.loading= false;

      }
      else if(response["message"]==-6){
        window.scroll(0,0);
        this.toastrservice.error("Team Member not registered in the fiesta Website")
        this.alert=true;
        this.wait= false;
        this.loading= false;
      }
      else if(response["message"]==-4){
        window.scroll(0,0);
        this.toastrservice.error("Team member already Registered for this event")
        this.alert=true;
        this.wait= false; 
        this.loading= false;

      }
      else if(response["message"]==-5){
        window.scroll(0,0);
        this.toastrservice.error("Team Name already Exist!! Enter different Team Name")
        this.alert=true;
        this.wait= false; 
        this.loading= false;
      }
      else if(response["message"]==-7){
        window.scroll(0,0);
        this.toastrservice.show("Error Contact the admin")
        this.alert=false;
        this.success=true;
        this.loading= false;
      }
      else{
        window.scroll(0,0);
        this.router.navigateByUrl("/");
        this.studentservice.addevents(this.data.name);
        if(this.participantForm.value.teamname)
          this.studentservice.addteams(this.participantForm.value.teamname);
       // this.error= "Error Contact the admin"
        this.alert=true;
        this.wait= false;
        this.loading= false;

      }
    })
  this.loading=false
  } 
  
  back(){
    const redirectUrl = '/event/'+ this.id;
    // Redirect the user
    this.router.navigate([redirectUrl]);
  }
}
