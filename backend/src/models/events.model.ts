import { model, Schema } from "mongoose";
import { RegisterStudent } from "./students.model";

export interface Events{
  id:string;
  name:string;
  participants:RegisterStudent[];
}
export const RegisterStudentSchema=new Schema<RegisterStudent>({
    name:{type:String,required:true},
    email:{type:String,required:true},
    admissionNo:{type:Number,required:true},
    gender:{type:String,required:true},
    department:{type:String,required:true},
    year:{ type:String, required:true },
    section:{ type:String, required:true },
  })
export const EventSchema=new Schema<Events>({
  name:{
    type:String,
    required:true
  },
  participants:[RegisterStudentSchema]


},
{
  toJSON:{
    virtuals:true
  },
  toObject:{
    virtuals:true
  },
  timestamps:true

}
)


export const EventModel=model<Events>('ParticipantsCollection',EventSchema);