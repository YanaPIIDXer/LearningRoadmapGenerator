import type { ILineApi } from "./LINEApiInterface";

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
}
