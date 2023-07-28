import { Router } from "express";
const router= Router();
import asyncHandler from "express-async-handler";
import { TeamEventModel, TeamEvents } from "../models/groupteam.model";
import { UserModel } from "../models/user.model";
import { RegisterStudent, Student, StudentModel } from "../models/students.model";

var TL:Student
var team:TeamEvents={
  id:'', 
  name:'',
  teamname:'',
  participants:[]
}
// router.post("/checkRegister",async(req,res)=>{
//   const {eventname,teamName,teammem1,email1,teammem2,email2,teammem3,email3,teammem4,email4,teammem5,email5,teammem6,email6}=req.body;
//   var arrayUnreg:any[]=[];
//   // var i=2;
//   var emails=[email2,email3,email4,email5,email6];
//   for(var i=0;i<5;i++){
//     if(emails[i]){
//       let user=await UserModel.findOne({email:emails[i]});
//       if(!user){
//         arrayUnreg.push(i+2);
//       }
//     }
//   }
//   // console.log(arrayUnreg);
//   res.send(arrayUnreg);

// })

// router.post('/create',asyncHandler(
//   async(req,res)=>{
//    const {eventname,teamName,teammem1,email1,teammem2,email2,teammem3,email3,teammem4,email4,teammem5,email5,teammem6,email6}=req.body;

// //    await GroupModel.deleteOne({
// //     eventname:eventname,
// //     email1: email1,
// //     paystatus: false
// // });

//    const groupTeam:Team={
//       eventname,
//       teamName,
//       teammem1,
//       email1,
//       teammem2,
//       email2,
//       teammem3,
//       email3,
//       teammem4,
//       email4,
//       teammem5,
//       email5,
//       teammem6,
//       email6
//    }

//    const newTeam=await GroupModel.create(groupTeam);
//     res.send(newTeam);
//   }
// ))






// router.post('/register',asyncHandler(async(req,res)=>{
//   const {eventname,teamName,teammem1,email1,teammem2,email2,teammem3,email3,teammem4,email4,teammem5,email5,teammem6,email6}=req.body;
//   const groupTeam:Team={
//     eventname,
//     teamName,
//     teammem1,
//     email1,
//     teammem2,
//     email2,
//     teammem3,
//     email3,
//     teammem4,
//     email4,
//     teammem5,
//     email5,
//     teammem6,
//     email6
//  }

//  const newTeamRegister=await GroupModel.create(groupTeam);
//  res.send(newTeamRegister);

// }))



// router.post('/groupeventparticipation',asyncHandler(
//   async (req, res) => {
//       const eventname=req.body.Ename
//       const {teamname}=req.body.teamname
//       const teamleader=req.body.teamleader
//       const teammembers= req.body.participants
//      var leader=await StudentModel.findOne({admissionNo:teamleader})
//      if(leader){
//       let eventexists=leader.event.find(prod=>prod===eventname);
//           if(eventexists){
//               res.json({msg:-1})
//           }
//           else{
//               for(var i=0;i<teammembers.length;i++){
//                   var member=await StudentModel.findOne({admissionNo:teammembers[i].adminno})
//                   if(member)
//                   {
//                     let eventexists=member.event.find(prod=>prod===eventname);
//                        if(eventexists){
//                           res.json({msg:-1})
//                         }
//                   }
//                   else
//                   {
//                     res.json({msg:-2})
//                   }
//               }
//               var events=leader.event
//               events.push(eventname)
//               leader.event=events
//               await student.save();
//               const  newparticpant:RegisterStudent= {
//                   name:student.name,
//                   email:student.email,
//                   admissionNo:adminno,
//                   gender:student.gender,
//                   department:student.department,
//                   year:student.year,
//                   section:student.section

//               }
//               var eventparticipants=await EventModel.findOne({name:eventname})
//               if(eventparticipants){
//               let participants= eventparticipants.participants
             
//               participants.push(newparticpant)
//               eventparticipants.participants=participants
//               eventparticipants.save();
//               res.send(student)
              
//               }
//               else{
//                   const newevent:Events={
//                       id:'',
//                       name:eventname,
//                       participants:[newparticpant]
//                   }
//                   const created= await EventModel.create(newevent)
//                   res.send(student)
//               }
              

//           }

//      }
     
//  }
//  ))


router.post('/checkgroupevent',asyncHandler(
  async(req,res)=>{
    const adminno=req.body.adminno
    const Ename=req.body.Ename
    const student=await StudentModel.findOne({admissionNo:adminno})
    if(student){
      if(checkEventexists(student,Ename)){
        res.json({msg:-1})
      }
      //setTeamLeader(student)
    res.json({msg:0})
    }
    

  }
))

router.post('/addteammember',asyncHandler(
  async(req,res)=>{
    console.log(team.participants)
    const adminno=req.body.adminno
    const Ename=req.body.Ename
    const student=await StudentModel.findOne({admissionNo:adminno})
    if(student){
      var teamleader=getTeamLeader()
      if(checkEventexists(student,Ename)){
        res.json({msg:-1}) //Already Registered Event
      }
      else if(teamleader.gender!=student.gender){
        res.json({msg:-3}) //Gender Checking
      }
      addteammember(student)
    res.json({msg:0})
    }
    else{
      res.json({msg:-2})//Not registered team member
    }
    

  }
))


router.post('/setteamname',asyncHandler(
  async(req,res)=>{
    const teamName=req.body.teamname
    var Team=await TeamEventModel.findOne({teamname:teamName})
    if(Team){
      res.json({msg:-1}) //Team Name Exists
    }
    else{
      setteamname(teamName)
      res.json({msg:0})
    }

  }
))

router.post('formnewteam',asyncHandler(
  async(req,res)=>{
    var newteam:TeamEvents= getTeam()
    var created=await TeamEventModel.create(newteam)
    if(created){
      for(var i=0;i<newteam.participants.length;i++){
        const student=await StudentModel.findOne({admissionNo:newteam.participants[i].admissionNo})
                if(student)
                {
                  var events=student.event
                events.push(newteam.name)
                student.event=events
                await student.save();
              }
         }
         
    res.send(created)
  }
    else{
      res.json({msg:-1})
    }
  }
))


function checkEventexists(student:Student,Ename:string){
  if(student){
    let eventexists=student.event.find(prod=>prod===Ename);
              if(eventexists){
                  return true
              }
    }
    console.log("Ename",Ename)
    console.log(team.name)

    team.name=Ename
    return false
}

function setteamname(TeamName:string){
team.teamname=TeamName
}


function addteammember(member:Student){
  const  newparticpant:RegisterStudent= {
    name:member.name,
    email:member.email,
    admissionNo:member.admissionNo,
    gender:member.gender,
    department:member.department,
    year:member.year,
    section:member.section

}
team.participants.push(newparticpant)
}

function setTeamLeader(teamleader:Student){
    TL=teamleader
    const  newparticpant:RegisterStudent= {
                        name:teamleader.name,
                        email:teamleader.email,
                        admissionNo:teamleader.admissionNo,
                        gender:teamleader.gender,
                        department:teamleader.department,
                        year:teamleader.year,
                        section:teamleader.section
      
                    }
    team.participants.push(newparticpant)
}
function getTeamLeader(){
  return TL
}
function getTeam(){
  return team
}
export default router;