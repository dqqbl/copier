const WHITE_LIST = "whiteList";
const PROTOCOL = "http";

/** 安装初始化 */
chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === chrome.runtime.OnInstalledReason.INSTALL) {
    chrome.storage.sync.set({
      [WHITE_LIST]: [],
    });
    chrome.tabs.create({
      url: "boarding/index.html",
    });
  }
});

/** tab切换初始化 */
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (
    chrome.tabs.TabStatus.COMPLETE === tab.status &&
    tab.url.startsWith(PROTOCOL)
  ) {
    chrome.storage.sync.get([WHITE_LIST], (result) => {
      if (
        result[WHITE_LIST].includes(
          tab.url.match(/(?<=(http|https):\/\/).+?(?=\/)/)[0]
        )
      ) {
      }
    });
    chrome.scripting.insertCSS({
      target: { tabId },
      files: ["inject.css"],
    });
  }
});

/** 获取当前tab信息 */
async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}
