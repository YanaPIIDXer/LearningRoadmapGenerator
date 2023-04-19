import { APIGatewayEvent , APIGatewayProxyResult } from "aws-lambda";
import { lineApi } from "./line";

export const handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  // シグネチャ検証
  const signature = event.headers["X-Line-Signature"] ?? "";
  if (!lineApi.verifySignature(event.body ?? "", signature)) {
    return {
      statusCode: 403,
      body: JSON.stringify({
        message: "Veryfy signature failed.",
      }),
    }
  }
  
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "200 OK",
    }),
  }
}
