/**
 * ChatGPTからの返却値
 */
export interface RoadmapResponse {
  // ロードマップが生成できなかった場合にtrueになる
  // （「意味不明な単語のロードマップを生成しようとした」等）
  error: boolean;

  // ロードマップを出力する分野
  field: string;

  // ロードマップオブジェクト
  roadmap: Roadmap;
}

/**
 * ロードマップ
 */
export interface Roadmap {
  // カテゴリ
  category: string;

  // タスクリスト
  tasks: string[];
}
