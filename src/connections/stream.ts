import axios from 'axios';
import Product from '../models/Product';

import {DynamoDB} from 'aws-sdk'



export const dynamoStream = async (event: any) => {
  console.log('-------1111111111111--------------')
  try {
    for (const record of event.Records) {

    const updateRecored=  DynamoDB.Converter.unmarshall(record.dynamodb.NewImage)
        console.log(updateRecored)        

      if (record.eventName === 'INSERT') {

        // await axios.post('https://webhook.site/7a6e1bc4-6d83-44b5-9798-fa0375ac4a78',{
        //   updateRecored
        // })

        
        await Product.create({
          id: updateRecored?.id,
          name:updateRecored?.name,
          price:updateRecored?.price,
          expiry:updateRecored?.expiry,
          addedDate:updateRecored?.addedDate,
          colour:updateRecored.colour
        })

      } 

    }

    return `Document Added`
  } catch (error) {
    console.error(error)
    return
  }
};
