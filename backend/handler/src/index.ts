import { APIGatewayEvent , APIGatewayProxyResult } from "aws-lambda";

export const handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  console.log(JSON.stringify(event.body ?? "{}"));

  return {    
    statusCode: 200,
    body: JSON.stringify({
      message: "hello",
    })
  }
}
