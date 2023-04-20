import { APIGatewayEvent , APIGatewayProxyResult } from "aws-lambda";
import axios from "axios";
import * as openai from "openai";

/**
 * リクエストに対するハンドラ
 */
export const handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  const body = JSON.parse(event.body ?? "{}");

  const field: string = body.field;
  const choices: string[] = body.choices;

  try {
    // プロンプト取得
    const conn = axios.create({
      baseURL: process.env.FRONTEND_ORIGIN_URL,
    });
    const promptResponse = await conn.get("/templates/prompt.txt");
    const promptBase: string = promptResponse.data;
    const prompt = promptBase.replace(/@@FIELD@@/, field)
                             .replace(/@@ANSWERS@@/, choices.reduce((p, c) => p + c));
    
    // ロードマップ生成
    const config = new openai.Configuration({
      apiKey: process.env.CHAT_GPT_API_KEY,
    });
    const client = new openai.OpenAIApi(config);
    const response = await client.createChatCompletion({
      model: "gpt-3.5-turbo-0301",
      messages: [{ role: "user", content: prompt }],
    });
    console.log(response.data.choices[0].message?.content);
  } catch (error: any) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error }),
    }
  }
  
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "200 OK",
    }),
  }
}
