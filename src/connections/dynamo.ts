import { DynamoDB } from "aws-sdk";

const dynamo = new DynamoDB.DocumentClient({
  region:'us-east-1'
});

export default dynamo;