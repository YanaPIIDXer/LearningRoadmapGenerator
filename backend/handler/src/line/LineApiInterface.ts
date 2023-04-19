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
   * @param groupId グループID
   * @param message メッセージ
   */
  postMessage(groupId: string, message: string): Promise<void>;
}
