export class Student{
    id!:string;
    name!:string;
    email!:string;
    password?:string;
    isAdmin!:boolean;
    event?:string[];
    yourteams?:string[];
    admissionNo!:string;
    gender!:string;
    department!:string;
    year!:string;
    section!:string;
    points?:number;
    token!:string;
  }

export class soloparticpation{
  adminno!:string
  Ename!:string
}

export class groupparticpation{
  adminno!:string[]
  Ename!:string
}