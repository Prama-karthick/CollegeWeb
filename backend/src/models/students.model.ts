import { model, Schema } from "mongoose";

export interface Student{
  id:string;
  admissionNo:string;
  isAdmin:boolean;
  event:string[];
  yourteams:string[];
  password:string;
  name:string;
  year:string;
  gender:string;
  department:string;
  email:string;
  section:string;
  accomdation:string;
  mobileNo:string;
  collegeName:string;
  points:number;
}

export interface RegisterStudent{
  name:string;
  email:string;
  admissionNo:string;
  gender:string;
  department:string;
  collegeName:string,
  year:string;
  section:string;
}




export const StudentSchema=new Schema<Student>({
  name:{type:String,required:true},
  email:{type:String,required:true,unique:true},
  password:{type:String},
  isAdmin:{type:Boolean},
  event:{type:[String]},
  yourteams:{type:[String]},
  admissionNo:{type:String,unique:true},
  year:{type:String},
  gender:{type:String},
  department:{type:String},
  section:{type:String},
  accomdation:{type:String},
  mobileNo:{type:String},
  collegeName:{type:String},
  points:{type:Number}
},
{
  toJSON:{virtuals:true},toObject:{virtuals:true},timestamps:true
})



export const StudentModel=model<Student>('StudentCollections',StudentSchema);