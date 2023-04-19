import { APIGatewayEvent , APIGatewayProxyResult } from "aws-lambda";

/**
 * リクエストに対するハンドラ
 */
export const handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  const body = JSON.parse(event.body ?? "{}");
  console.log("Field", body.field);
  
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "200 OK",
    }),
  }
}
