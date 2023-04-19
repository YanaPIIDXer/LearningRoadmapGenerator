import { APIGatewayEvent , APIGatewayProxyResult } from "aws-lambda";
import { constructLineApi } from "../../line";
import type { WebhookEvent, MessageEvent, TextMessage } from "@line/bot-sdk";

/**
 * LINEのWebHookハンドラ
 */
export const handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  if (!event.body) {
    console.error("Invalid request body.");
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Invalid request body.",
      }),
    }
  }
  
  // シグネチャ検証
  const lineApi = constructLineApi();
  const signature = event.headers["X-Line-Signature"];
  if (signature && !lineApi.verifySignature(event.body, signature)) {
    console.error("Verify signature failed.");
    return {
      statusCode: 403,
      body: JSON.stringify({
        message: "Veryfy signature failed.",
      }),
    }
  }

  // LIFFに誘導
  const body = JSON.parse(event.body);
  const promises = (body.events as WebhookEvent[]).map(ev => {
    if (ev.type !== "message") { return new Promise<void>(r => { r(); }); }

    const msgEv = ev as MessageEvent;
    if (msgEv.message.type !== "text" || !msgEv.source.userId) { return new Promise<void>(r => { r(); }); }
    const msg = msgEv.message as TextMessage;
  
    // 学びたい分野が発言されるので、LIFFの方に誘導するURLを生成する
    const params = new URLSearchParams({
      field: msg.text,
      userId: msgEv.source.userId,
    });

    const url = "https://learning-roadmap-generator.web.app?" + params.toString();
    console.log("URL Generated", url);
    return lineApi.postMessage(msgEv.source.userId, url);
  });

  await Promise.all(promises);
  
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "200 OK",
    }),
  }
}
