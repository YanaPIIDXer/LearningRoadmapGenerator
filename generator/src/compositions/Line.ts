import liff from "@line/liff";

/**
 * LINE関係のComposition
 */
export const useLINE = () => {
  /**
   * LIFFへのログイン
   */
  const loginLIFF = (): void => {
    liff.init({
      liffId: import.meta.env.VITE_APP_LINE_LIFF_ID,
      withLoginOnExternalBrowser: true,
    }, () => {
      console.log("Init LIFF Success!");
    }, () => {
      console.error("Init LIFF Error...");
    });
  }

  /**
   * LIFFを閉じる
   */
  const closeLIFF = () => {
    liff.closeWindow();
  }

  /**
   * メッセージを送信
   * @param message メッセージ
   */
  const sendMessage = async (message: string): Promise<void> => {
    if (!liff.isInClient()) { throw ("Is not LINE client application. Please use this app in LINE client application."); }
    await liff.sendMessages([{
      type: "text",
      text: message,
    }]);
  }
  
  return {
    loginLIFF,
    closeLIFF,
    sendMessage,
  }
}