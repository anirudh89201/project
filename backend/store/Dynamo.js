import {DynamoDBClient} from "@aws-sdk/client-dynamodb"
import {DynamoDBDocumentClient} from "@aws-sdk/lib-dynamodb"
console.log("ENV CHECK:", {
    access: process.env.AWS_ACCESS_KEY_ID,
    secret: process.env.AWS_SECRET_ACCESS_KEY,
  });
const client = new DynamoDBClient({
    region:"us-east-1"
})
export const ddbDocClient =  DynamoDBDocumentClient.from(client)