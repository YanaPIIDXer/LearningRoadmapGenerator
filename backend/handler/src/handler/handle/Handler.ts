import { APIGatewayEvent , APIGatewayProxyResult } from "aws-lambda";
import { lineApi } from "../../line";
import type { WebhookEvent, MessageEvent, TextMessage } from "@line/bot-sdk";

/**
 * LINEのWebHookハンドラ
 */
export const handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Invalid request body.",
      }),
    }
  }
  
  // シグネチャ検証
  const signature = event.headers["X-Line-Signature"] ?? "";
  if (!lineApi.verifySignature(event.body, signature)) {
    return {
      statusCode: 403,
      body: JSON.stringify({
        message: "Veryfy signature failed.",
      }),
    }
  }

  // LIFFに誘導
  const body = JSON.parse(event.body);
  (body.events as WebhookEvent[]).forEach(ev => {
    if (ev.type !== "message") { return; }

    const msgEv = ev as MessageEvent;
    if (msgEv.message.type !== "text" || !msgEv.source.userId) { return; }
    const msg = msgEv.message as TextMessage;
  
    // 学びたい分野が発言されるので、LIFFの方に誘導するURLを生成する
    const params = new URLSearchParams({
      field: msg.text,
      userId: msgEv.source.userId,
    });
    lineApi.postMessage(msgEv.source.userId, "https://learning-roadmap-generator.web.app?" + params.toString());
  });
  
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "200 OK",
    }),
  }
}
