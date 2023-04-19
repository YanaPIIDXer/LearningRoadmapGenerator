import type { ILineApi } from "./LINEApiInterface";
import { ApiMock } from "./ApiMock";
import { LineApi } from "./LineApi";

// 環境に合わせてモックと実際のオブジェクトを入れ替える
export const lineApi: ILineApi = process.env.EXEC_LOCAL ? new ApiMock() : new LineApi();
