import { APIGatewayEvent , APIGatewayProxyResult } from "aws-lambda";
import axios from "axios";
import * as openai from "openai";
import { RoadmapResponse } from "../../interfaces/Roadmap";
import { LineApi } from "../../line/LineApi";

/**
 * リクエストに対するハンドラ
 */
export const handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  const body = JSON.parse(event.body ?? "{}");

  const field: string = body.field;
  const choices: string[] = body.choices;
  const userId: string = body.userId;

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
  const roadmapResponse: RoadmapResponse = JSON.parse(response.data.choices[0].message?.content ?? "{ error: true }");
  if (roadmapResponse.error) {
    return {
      statusCode: 400,
      body: "Maybe Unknown field.",
    }
  }

  // LINEに返却
  let message = `${roadmapResponse.field}の学習ロードマップ\n\n`;
  roadmapResponse.roadmap.forEach(roadmap => {
    message += `～ ${roadmap.category} ～\n`;
    roadmap.tasks.forEach(task => {
      message += `・${task}\n`;
    });
    message += "\n"
  });

  const lineApi = new LineApi();
  await lineApi.postMessage(userId, message);
  
  return {
    statusCode: 200,
    body: "200 OK",
  }
}
