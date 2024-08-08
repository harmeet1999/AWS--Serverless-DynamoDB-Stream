import { Schema, model } from 'mongoose'

import { IProductDocument } from '../Types/product'



const productSchema = new Schema<IProductDocument>(
  {

    id: {
      type: String,
      required: [true, ' ID is required'],
    },
    name: {
      type: String,
      trim: true,
      required: [true, ' ID is required'],

    },
    colour: {
      type: String,
      trim: true,
      required: [true, ' colour is required'],

    },
    addedDate: {
      type: Date,
      required: [true, ' Added Date is required'],


    },
    expiry: {
      type: Date,
      required: [true, ' Expire Date is required'],

    },
    price: {
      type: Number,
      required: [true, 'Price is required'],

    }
  },
  {
    timestamps: true,

  }
)


productSchema.index({ name: "text" })



export default model<IProductDocument>('Products', productSchema)