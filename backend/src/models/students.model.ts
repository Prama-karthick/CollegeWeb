import { model, Schema } from "mongoose";

export interface Student{
  id:string;
  name:string;
  email:string;
  password:string;
  isAdmin:boolean;
  event:string[];
  yourteams:string[];
  admissionNo:number;
  gender:string;
  department:string;
  year:string;
  section:string;
  points:number;
}

export interface RegisterStudent{
  name:string;
  email:string;
  admissionNo:number;
  gender:string;
  department:string;
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
  admissionNo:{type:Number,required:true,unique:true},
  year:{type:String,required:true},
  gender:{type:String,required:true},
  department:{type:String,required:true},
  section:{type:String,required:true},
  points:{type:Number}
},
{
  toJSON:{virtuals:true},toObject:{virtuals:true},timestamps:true
})



export const StudentModel=model<Student>('StudentCollections',StudentSchema);