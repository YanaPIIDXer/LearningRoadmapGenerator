import { APIGatewayEvent , APIGatewayProxyResult } from "aws-lambda";
import * as Request from "./handler/request/Handler";
import * as Handle from "./handler/handle/Handler";

export const handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  try {
    const path = event.path;
    switch (path) {
      case "/request": return await Request.handler(event);
      case "/handle": return await Handle.handler(event);
    }
    
    return {
      statusCode: 404,
      body: JSON.stringify({
        message: "No Routing",
      }),
    }  
  } catch (error) {
    console.error("Internal Server Error", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error }),
    }
  }
}
