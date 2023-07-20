export class Products{
  id!:string;
  name!:string;
  time!:string;
  imageUrl!:any;
  rules?:string[];
  price!:number;
  tname!:string;
  group!:string;
  venue!:string;
  speaker?:string[];
  conductedby!:string[];
  desc?:string;
}

export class Events{
  id!:number;
  name!:string;
  imageUrl!:string;
  rules!:string[];
}

