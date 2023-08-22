import {Router} from 'express';
import asyncHandler from "express-async-handler";
import { details } from '../data';
import { Product, ProductModel } from '../models/product.model';
import { eventdetails } from '../legacyEvents';

const router=Router();

router.get("/",asyncHandler(
  async(req,res)=>{
   const products=await ProductModel.find()
   res.send(products);
})
)

router.get('/seed',asyncHandler(
  async (req, res) => {
     const productsCount = await ProductModel.countDocuments();
     if(productsCount> 0){
       res.send("Seed is already done!");
       return;
     }
 
     await ProductModel.create(details);
     res.send("Seed Is Done!");
 }
 ))
router.get("/:id",asyncHandler(
  async(req,res)=>{
    var id=parseInt(req.params.id)
    var  foundevent
    // const product=await ProductModel.findById(req.params.id);
    for(var i=0;i<eventdetails.length;i++)
    {
      if(i==id){
        foundevent=eventdetails[i]
      }
    }
    res.send(foundevent);
  }
));

router.get("/group/:name",asyncHandler(
  async(req,res)=>{
    const groupName=req.params.name;
    // const product=await ProductModel.find({group:groupName});

    res.send(eventdetails);
  }
))

router.post('/addproduct', asyncHandler(
  async (req, res) => {
    const {name, time, imageUrl, venue,conductedby,tname,group} = req.body;
let price=0
    if(tname=="workshop"){
       price=400;
    }
    else{
       price=200;
    }
    const newProduct:Product = {
      id:'',
      name,
      time,
      imageUrl,
      rules:[],
      price:price,
      tname,
      group,
      venue,
      speaker:[],
      conductedby,
      desc:'',
    }

    const product = await ProductModel.create(newProduct);
    res.send((product));
  }
))

export default router;
