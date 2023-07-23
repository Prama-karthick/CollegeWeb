import { Router } from "express";
import asyncHandler from "express-async-handler";
import { Student, StudentModel } from "../models/students.model";
import { studentlist } from "../studentlist";
import jwt from "jsonwebtoken";

const router= Router();


router.get('/insert',asyncHandler(
    async (req, res) => {
       const studentscount = await StudentModel.countDocuments();
       const incount= studentlist.length;
       if(studentscount> incount){
         res.send("Check Details");
         return;
       }
   
       await StudentModel.create(studentlist);
       res.send("Inserted Successfully!");
   }
   ))



router.post('/search',asyncHandler(async(req,res)=>{
    const {adnumber}=req.body;
    console.log(adnumber)
    const student=await StudentModel.findOne({admissionNo:adnumber});
    if(!student){
      res.status(400).send("No match");
    }
    else{
      if(student.password){
        res.json({msg:-1})
        }
        else{
          res.send(student)
        }
    }

  }))


  router.post('/register',asyncHandler(async(req,res)=>{
    const {adnumber,password}=req.body;
    const student=await StudentModel.findOne({admissionNo:adnumber});
    if(!student){
      res.status(400).send("No match");
      res.json({msg:-1})
    }
    if(student){
    student.password=password
    await student.save();
    res.send(generateTokenResponse(student));
  }
  }))

  router.post("/login",asyncHandler(
    async(req,res)=>{
      const {adnumber,password}=req.body;
      console.log(adnumber)
      const student=await StudentModel.findOne({admissionNo:adnumber});

      if(student) {
        if(student.password==password){
          res.send(generateTokenResponse(student));
        }
        else{
           res.json({msg:-1}) 
           
        }
       }
       else{
        res.json({msg:-2})    
      }
  }))

var currentstudent!:Student
  const generateTokenResponse=(user:any)=>{
    const token=jwt.sign({
      id: user.id,
      email:user.email,isAdmin: user.isAdmin
    },process.env.JWT_SECRET!,{
      expiresIn:"1h"
    });
    currentstudent={ id: user.id,
      email: user.email,
      name: user.name,
      password:user.password,
      isAdmin:user.isAdmin,
      event:user.event,
      yourteams:user.yourteams,
      gender:user.gender,
      admissionNo:user.admissionNo,
      department:user.department,
      year:user.year,
      section:user.section,
      points:user.points,
    }
    return  {
      id: user.id,
      email: user.email,
      name: user.name,
      isAdmin:user.isAdmin,
      event:user.event,
      yourteams:user.yourteams,
      gender:user.gender,
      admissionNo:user.admissionNo,
      department:user.department,
      year:user.year,
      section:user.section,
      points:user.points,
      token: token
    };
}

export function getstudent(){
  return currentstudent;
}


export default router;