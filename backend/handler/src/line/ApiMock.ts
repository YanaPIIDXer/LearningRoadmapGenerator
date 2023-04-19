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
   * @param groupId グループID
   * @param message メッセージ
   */
  async postMessage(groupId: string, message: string): Promise<void> {
    console.log("MESSAGE", message);
  }
}
