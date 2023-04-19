import liff from "@line/liff";

/**
 * LINE関係のComposition
 */
export const useLINE = () => {
  /**
   * LIFFへのログイン
   */
  const loginLIFF = () => {
    liff.init({
      liffId: import.meta.env.VITE_APP_LINE_LIFF_ID,
      withLoginOnExternalBrowser: true,
    }, () => {
      console.log("Init LIFF Success!");
    }, () => {
      console.error("Init LIFF Error...");
    });
  }
  
  return {
    loginLIFF,
  }
}