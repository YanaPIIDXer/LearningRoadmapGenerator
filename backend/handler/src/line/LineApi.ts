import type { ILineApi } from "./LINEApiInterface";
import Line from "@line/bot-sdk";

const accessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN!;
const channelSecret = process.env.LINE_CHANNEL_SECRET!;

/**
 * LINEのAPIを実際に叩くクラス
 */
export class LineApi implements ILineApi {
  // LINE API Client
  private client: Line.Client
  
  /**
   * コンストラクタ
   */
  constructor() {

    const config: Line.ClientConfig = {
      channelAccessToken: accessToken,
      channelSecret: channelSecret,
    };
    this.client = new Line.Client(config);
  }

  /**
   * シグネチャの検証
   * @param body レスポンスボディ
   * @param signature シグネチャ
   * @returns 検証が通ればtrue
   */
  verifySignature(body: string, signature: string): boolean {
    return Line.validateSignature(body, channelSecret, signature);
  }
}
