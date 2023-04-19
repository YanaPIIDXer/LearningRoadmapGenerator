import { APIGatewayEvent , APIGatewayProxyResult } from "aws-lambda";
import * as Request from "./handler/request/Handler";
import * as Handle from "./handler/handle/Handler";

export const handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  const path = event.path;
  switch (path) {
    case "/request": return Request.handler(event);
    case "/handle": return Handle.handler(event);
  }
  
  return {
    statusCode: 404,
    body: JSON.stringify({
      message: "No Routing",
    }),
  }
}
