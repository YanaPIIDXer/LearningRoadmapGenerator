import { APIGatewayEvent , APIGatewayProxyResult } from "aws-lambda";
import axios from "axios";
import openai from "openai";

/**
 * リクエストに対するハンドラ
 */
export const handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  const body = JSON.parse(event.body ?? "{}");

  const field = body.field;
  const choices = body.choices;

  try {
    const conn = axios.create({
      baseURL: process.env.FRONTEND_ORIGIN_URL,
    });
    const promptResponse = await conn.get("/templates/prompt.txt");
    const prompt: string = promptResponse.data;
    console.log(prompt);
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error }),
    }
  }
  
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "200 OK",
    }),
  }
}
