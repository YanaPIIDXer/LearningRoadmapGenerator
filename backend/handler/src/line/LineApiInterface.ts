/**
 * LINE API実行インタフェース
 */
export interface ILineApi {
  /**
   * シグネチャの検証
   * @param body レスポンスボディ
   * @param signature シグネチャ
   * @returns 検証が通ればtrue
   */
  verifySignature(body: string, signature: string): boolean;

  /**
   * メッセージ送信
   * @param replyToken リプライトークン
   * @param message メッセージ
   */
  postMessage(replyToken: string, message: string): Promise<void>;
}
