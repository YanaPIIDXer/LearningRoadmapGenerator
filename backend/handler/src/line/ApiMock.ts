import type { ILineApi } from "./LineApiInterface";

/**
 * APIのモック
 * ローカルサーバで使用する
 */
export class ApiMock implements ILineApi {
  /**
   * コンストラクタ
   */
  constructor() {}

  /**
   * シグネチャの検証
   */
  verifySignature(): boolean {
    return true;
  }

  /**
   * メッセージ送信
   * @param replyToken リプライトークン
   * @param message メッセージ
   */
  async postMessage(replyToken: string, message: string): Promise<void> {
    console.log("MESSAGE", message);
  }
}
