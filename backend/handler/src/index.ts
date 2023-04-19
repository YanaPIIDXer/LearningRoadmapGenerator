import { APIGatewayEvent , APIGatewayProxyResult } from "aws-lambda";
import { lineApi } from "./line";

export const handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "hello",
    })
  }
}
