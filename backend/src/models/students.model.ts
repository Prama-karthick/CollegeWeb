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


export interface LegacyStudent{
  id:string;
  StudentName:string;
  year:string;
  collegeName:string;
  Email:string;
  MobileNo:string;
  Gender:string;
  Accomdation:string;
  Accom_payment:string;
  Payment:string;
  SYMPHONIQUE:string;
  விவாத:string;
  DIVIDE:string;
  MONSTERS:string;
  MARTIAL:string;
  KALAKKAL:string;
  SHERLOCK:string;
  QUIZZARDS:string;
  BEST:string;
  RANGOLI:string;
  GRAPHIX:string;
  CHOREO:string;
  VOICE:string;
  MUSIC:string;
  DIVINE:string;
  MARKETOMANIA:string;
  கவித்திடல்:string;
  PIXIE:string;
  DRAMATICS:string;
  CINEMATRIX:string;
  LIPHOMANIAC:string;
  YOGA:string;
  DEBATE:string;
  EXPRESSIONS:string;
  TREASURE:string;
  MAKE:string;
  EXTEMPORE:string;
  WAR:string;
  மறுவார்த்தை:string;
  PENCIL:string;
  LYRICAL:string;
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


export const LegacyStudentSchema=new Schema<LegacyStudent>({
  StudentName:{type:String,required:true},
  year:{type:String},
  collegeName:{type:String,required:true},
  Email:{type:String},
  MobileNo:{type:String},
  Gender:{type:String},
  Accomdation:{type:String},
  Accom_payment:{type:String},
  Payment:{type:String},
  SYMPHONIQUE:{type:String},
  விவாத:{type:String},
  DIVIDE:{type:String},
  MONSTERS:{type:String},
  MARTIAL:{type:String},
  KALAKKAL:{type:String},
  SHERLOCK:{type:String},
  QUIZZARDS:{type:String},
  BEST:{type:String},
  RANGOLI:{type:String},
  GRAPHIX:{type:String},
  CHOREO:{type:String},
  VOICE:{type:String},
  MUSIC:{type:String},
  DIVINE:{type:String},
  MARKETOMANIA:{type:String},
  கவித்திடல்:{type:String},
  PIXIE:{type:String},
  DRAMATICS:{type:String},
  CINEMATRIX:{type:String},
  LIPHOMANIAC:{type:String},
  YOGA:{type:String},
  DEBATE:{type:String},
  EXPRESSIONS:{type:String},
  TREASURE:{type:String},
  MAKE:{type:String},
  EXTEMPORE:{type:String},
  WAR:{type:String},
  மறுவார்த்தை:{type:String},
  PENCIL:{type:String},
  LYRICAL:{type:String},
},
{
  toJSON:{virtuals:true},toObject:{virtuals:true},timestamps:true
})



export const StudentModel=model<Student>('StudentCollections',StudentSchema);

export const LegacyStudentModel=model<LegacyStudent>('LegacyStudents',LegacyStudentSchema);