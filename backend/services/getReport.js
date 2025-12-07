import { QueryCommand } from "@aws-sdk/lib-dynamodb"
import { ddbDocClient } from "../store/Dynamo.js"
export const getReports = async(EmailID) => {
    console.log("Email:",EmailID)
    const params = {
        TableName:"Users",
        KeyConditionExpression:"EmailID = :emailID AND begins_with(sk,:prefix)",
        ExpressionAttributeValues:{
            ":emailID":EmailID,
            ":prefix":"REPORT"
        }
    };
    try{
        const response = await ddbDocClient.send(new QueryCommand(params))
        console.log(response.Items)
    }catch(error){
        console.log("DynamoDB error",error)
    }
}   