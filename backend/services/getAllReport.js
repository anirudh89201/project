import { QueryCommand } from "@aws-sdk/lib-dynamodb"
import { ddbDocClient } from "../store/Dynamo.js"
export const getReports = async(EmailID) => {
    console.log("Email:",EmailID)
    const params = {
        TableName:"Users",
        KeyConditionExpression:"EmailID = :emailID AND begins_with(sk,:prefix)",
        ProjectionExpression:"#res",
        ExpressionAttributeNames:{
            "#res":"response"
        },
        ExpressionAttributeValues:{
            ":emailID":EmailID,
            ":prefix":"REPORT"
        }
    };
    try{
        const response = await ddbDocClient.send(new QueryCommand(params))
        if(response?.Items){
            return response.Items
        }
        return []
    }catch(error){
        console.log("DynamoDB error",error)
    }
}   
export const getLatestReport = async(EmailID) => {
    console.log("Email ID",EmailID)
    const params = {
        TableName:"Users",
        KeyConditionExpression:"EmailID = :email",
        ExpressionAttributeValues:{
            ":email": EmailID
        },
        ScanIndexForward:false,
        Limit:1
    }
    try{
        const response = await ddbDocClient.send(new QueryCommand(params))
        return response.Items?.[0]
    }catch(error){
        console.log("Dynamo DB error",error)
    }
}