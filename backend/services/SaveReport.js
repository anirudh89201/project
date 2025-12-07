import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { ddbDocClient } from "../store/Dynamo.js"
export const SaveReportForUser = async(user,response) => {
        const timeStamp = Date.now();
        const sk = `REPORT${timeStamp}`
        const params = {
            TableName:"Users",
            Item:{
                EmailID:user,
                sk,
                response,
                createdAt:new Date(timeStamp).toISOString()
            }
        }
        try{
            await ddbDocClient.send(new PutCommand(params))
            return {success:true, message:"Report Saved.."}
        }catch(error){
            console.log("DynamoDB insert error",error)
        }
}
