import { Router } from "express";
import asyncHandler from "express-async-handler";
import { RegisterStudent, Student, StudentModel } from "../models/students.model";
import { EventModel, Events, RegisterStudentSchema } from "../models/events.model";
import { GroupModel, TeamEvents,TeamEventModel } from "../models/groupteam.model";
import { eventdetails } from "../events";
import { getstudent } from "./student.router";


const router= Router();

router.post('/soloeventparticipation',asyncHandler(
    async (req, res) => {

        const eventname=req.body.Ename
        const {adminno}=req.body
       var student=await StudentModel.findOne({email:adminno})
       if(student){
        let eventexists=student.event.find(prod=>prod===eventname);
            if(eventexists){
                res.json({msg:-1})
            }
            else{
                var events=student.event
                events.push(eventname)
                student.event=events
                await student.save();
                const  newparticpant:RegisterStudent= {
                    name:student.name,
                    email:student.email,
                    admissionNo:student.admissionNo,
                    gender:student.gender,
                    collegeName:student.collegeName,
                    department:student.department,
                    year:student.year,
                    section:student.section

                }
                var eventparticipants=await EventModel.findOne({name:eventname})
                if(eventparticipants){
                let participants= eventparticipants.participants
               
                participants.push(newparticpant)
                eventparticipants.participants=participants
                eventparticipants.save();
                res.send(student)
                
                }
                else{
                    const newevent:Events={
                        id:'',
                        name:eventname,
                        participants:[newparticpant]
                    }
                    const created= await EventModel.create(newevent)
                    res.send(student)
                }
                

            }

       }
       
   }
   ))


   router.post('/participates', asyncHandler(async(req, res)=>{
    // res.json({"message" : "Server Closed", "code": -1});
     //return;
    // if(req.body.event==10) return res.json({message: "Closed"});
     // console.log(req.body)
     
     //req.body.participants["0"].roll_number = req.body.participants["0"].roll_number.toUpperCase();
    //  var s=  getstudent()
    //  console.log(s.admissionNo)
    //  if(s.admissionNo!=req.body.participants["0"].admission_number){
    //      res.json({message: -2}) //differnt user with differnt adminno
    //      return
    //  }
    //  if(rollno!=req.body.participants["0"].roll_number){
    //      res.json({message: -3}) //differnt user with differnt rollno
    //      return
    //  }
    var member1= await StudentModel.findOne({admissionNo:req.body.participants[0].admissionNo})
     let obj= 1
     var ename!:string
     var newparticipants!:RegisterStudent[]
     TeamEventModel.findOne({teamname: req.body.teamname, event: req.body.event} ,function (err:any, team:TeamEvents) {
         if (err) {
             console.log("Error in Login module");
             res.json({message: -1}); // -1 -> Error
             return;
         }
         if (team) {
             obj=0;
             res.json({message: -5}) // team name already exist
         } 
    })
    if(obj){
        
        for(let i=0;i<eventdetails.length;i++){
           if(req.body.event==i){
                 ename=eventdetails[i].name
           }
        }
        var nochange=0
        for(let i=0; i<req.body.participants.length; i++){
           var student= await StudentModel.findOne({admissionNo:req.body.participants[i].admissionNo})
            
            if(student){
               if(student.password !=''){
                   let eventexists=student.event.find(prod=>prod===ename);
                    if(eventexists){
                        nochange=0
                       res.json({message:-4})//event exists for team member
                    }
                    else if(member1?.gender!=student.gender){
                        nochange=0
                        res.json({message:-2})
                    }
                    else{
                         nochange=1
                    }
                }
                else{
                    nochange=0
                    res.json({message:-6})//team member not registered
                }
            }
           
           
           
        }
        if(nochange){
            for(let i=0;i<req.body.participants.length;i++){
                var student= await StudentModel.findOne({admissionNo:req.body.participants[i].admissionNo})
                if(student){
                        var events=student.event
                            events.push(ename)
                            student.event=events
                          await student.save();
                          var teams=student.yourteams
                          teams.push(req.body.teamname)
                          student.yourteams=teams
                        await student.save();
                        //   const  newparticpant:RegisterStudent= {
                        //     name:student.name,
                        //     email:student.email,
                        //     admissionNo:student.admissionNo,
                        //     gender:student.gender,
                        //     department:student.department,
                        //     year:student.year,
                        //     section:student.section
        
                        // }
                        // newparticipants[i]=newparticpant
                        }
                        
            }
        

        const NewTeam:TeamEvents={
            id:'',
            teamname:req.body.teamname,
            name:ename,
            participants:req.body.participants
        }
        
        var doc=await TeamEventModel.create(NewTeam)
         if (doc) {
            res.send(doc)
            
            }
            // console.log("Doc: ", doc);
           else{
            res.json({message: -7});//notcreated
            }
        }
    }
    
    }
 
 ))


 router.get("/getsoloparticipants:productname",asyncHandler(async(req,res)=>{
      const eventname=req.params.productname
   
       const product=await EventModel.findOne({name:eventname});
      if(product){
        res.send(product.participants);
    }
         //   for(let i=0;i<eventdetails.length;i++){
    //     if(id==i){
    //       var  eventname=eventdetails[i].name
    // }}
    
    res.json({msg:-1})
    }
  ));



  router.get("/getgroupparticipants:productname",asyncHandler(async(req,res)=>{
    const eventname=req.params.productname
 
     const teams=await TeamEventModel.find({name:eventname});
    // console.log(teams);
    if(teams){
      //console.log(teams)
      
        for(let i=0;i<teams.length;i++){
            for(let j=0;j<teams[i].participants.length;j++){
                let aNo=teams[i].participants[j].admissionNo
                var student= await StudentModel.findOne({admissionNo:aNo})
                if(student)
                {
                    aNo=aNo+" "+student.name+" "+student.email+" "+student.department+"-"+student.year+"-"+student.section
                }
                teams[i].participants[j].admissionNo=aNo;

            }
        }
        res.send(teams);
    }
  
  res.json({msg:-1})
  }
));

router.get("/getgroupparticipants/Drama/Mime",asyncHandler(async(req,res)=>{
    const eventname="Drama/Mime"
 console.log(eventname);
     const teams=await TeamEventModel.find({name:eventname});
    
    if(teams){
      //console.log(teams)
      
        for(let i=0;i<teams.length;i++){
            for(let j=0;j<teams[i].participants.length;j++){
                let aNo=teams[i].participants[j].admissionNo
                var student= await StudentModel.findOne({admissionNo:aNo})
                if(student)
                {
                    aNo=aNo+" "+student.name+" "+student.email+" "+student.department+"-"+student.year+"-"+student.section
                }
                teams[i].participants[j].admissionNo=aNo;

            }
        }
        res.send(teams);
    }
  
  res.json({msg:-1})
  }
));



export default router;