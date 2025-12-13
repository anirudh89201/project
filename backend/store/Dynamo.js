import {DynamoDBClient} from "@aws-sdk/client-dynamodb"
import {DynamoDBDocumentClient} from "@aws-sdk/lib-dynamodb"

const client = new DynamoDBClient({
    region:"us-east-1",
    credentials:{
        accessKeyId:process.env.aws_access_key_id,
        secretAccessKey:process.env.aws_secret_access_key
    }
})
export const ddbDocClient =  DynamoDBDocumentClient.from(client)