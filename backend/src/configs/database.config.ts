import { connect,ConnectOptions, set } from "mongoose";
process.env.LOCAL_DB_CON
process.env.FIESTA_URI
export const dbConnect =()=>{
  connect(process.env.FIESTA_URI!,{
    useNewUrlParser:true,
    useUnifiedTopology:true
  } as ConnectOptions).then(
    ()=>console.log("connected successful"),
    (error)=>console.log(error)
  )
}