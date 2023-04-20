import { APIGatewayEvent , APIGatewayProxyResult } from "aws-lambda";
import * as Request from "./handler/request/Handler";
import * as Handle from "./handler/handle/Handler";

const handlerWrap = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  // Preflight
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      body: "",
    }
  }
  
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
  } catch (error: any) {
    console.error("Internal Server Error", error.message ?? error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error }),
    }
  }
}

export const handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  const response = await handlerWrap(event);
  // CORS
  return Object.assign(response, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Methods": "OPTIONS,POST",
      "Access-Control-Allow-Headers": "Content-Type,X-CSRF-TOKEN",
    }
  });
}
