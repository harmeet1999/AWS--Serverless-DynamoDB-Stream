import { Request, Response } from 'express'
import asyncHandler from '../middleware/async'
import {v4 as uuidv4} from 'uuid'
import dynamoDB from '../connections/dynamo'
import axios from 'axios'
import Product from '../models/Product'

export const test = asyncHandler(
  async (req: Request, res: Response) => {
    const {name,price,expiry,addedDate,colour}=req.body
 await Product.create({
  id: uuidv4(),
  name,
  price,
  expiry,
  addedDate,
  colour
 })
     res.status(200).json({
      success: true,
    })
  },
)


export const createUsers = asyncHandler(
  async (req: Request, res: Response) => {
    const {name,price,expiry,addedDate,colour}=req.body
    
    //Validate
    if (!name || typeof name !== 'string') {
      return res.status(400).send('Invalid or missing "name" field');
    }
    if (price === undefined || typeof price !== 'number') {
      return res.status(400).send('Invalid or missing "price" field');
    }
    if (!expiry ) {
      return res.status(400).send('Invalid or missing "expiry" field');
    }
    if (!addedDate) {
      return res.status(400).send('Invalid or missing "addedDate" field');
    }
    if (!colour || typeof colour !== 'string') {
      return res.status(400).send('Invalid or missing "colour" field');
    }
    const params = {
      TableName: 'Products',
      Item: {
        id: uuidv4(),
        name,
        price,
        expiry,
        addedDate,
        colour
      }
    };
  
    const data= await dynamoDB.put(params).promise();
    console.log(data)
    res.status(200).json({
      success: true,
      data:"Created successfully"
    })
  },
)

export const getAll = asyncHandler(
  async (req: Request, res: Response) => {


    const params = {
      TableName: 'Products'
    };
  
    const data= await dynamoDB.scan(params).promise();
    
    res.status(200).json({
      success: true,
      data
    })
  },
)



export const searchProducts = asyncHandler(
  async (req: Request, res: Response) => {
    const {name}=req.params
    console.log(name)
    // console.log(Product.getIndexes()  )
  
    name.replace('%', ' ')
    const data = await Product.aggregate([
      {
        $match: {
          name: {
            $regex: name,
            $options: "i" 
          }
        }
      }
    ]);
    res.status(200).json({
      success: true,
      data
    })
  },
)

