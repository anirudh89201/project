import { QueryCommand,DeleteCommand } from "@aws-sdk/lib-dynamodb"
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
export const getLatestReport = async (EmailID) => {
    console.log("Email ID", EmailID);
  
    const isGuest = EmailID.startsWith("guest_");
  
    const params = {
      TableName: "Users",
      KeyConditionExpression: "EmailID = :email",
      ExpressionAttributeValues: {
        ":email": EmailID,
      },
      ScanIndexForward: false, // latest first
      Limit: 1,
    };
  
    try {
      // Fetch latest report
      const response = await ddbDocClient.send(new QueryCommand(params));
      const latestReport = response.Items?.[0];
  
      // If guest, delete after fetching
      if (isGuest && latestReport) {
        const deleteParams = {
          TableName: "Users",
          Key: {
            EmailID: latestReport.EmailID,
            sk: latestReport.sk, // sort key
          },
        };
        await ddbDocClient.send(new DeleteCommand(deleteParams));
        console.log("Guest report deleted:", latestReport.sk);
      }
  
      return latestReport;
    } catch (error) {
      console.log("DynamoDB error", error);
      throw error; // rethrow to handle in API
    }
  };