/** 获取当前tab信息 */
async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

/** 获取域名 */
const getDomain = (url) => {
  return (url || "").match(/(?<=(http|https):\/\/).+?(?=\/)/)[0];
};

/** 安装初始化 */
chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === chrome.runtime.OnInstalledReason.INSTALL) {
    // chrome.storage.sync.set({
    //   whiteList: [],
    // });
    // chrome.tabs.create({
    //   url: "boarding/index.html",
    // });
  }
});

/** tab切换初始化 */
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (
    // @ts-ignore
    chrome.tabs.TabStatus.COMPLETE === tab.status &&
    tab?.url.startsWith("http")
  ) {
    const domain = getDomain(tab?.url);
    chrome.storage.sync.get([domain], (store) => {
      const config = store[domain];
      if (config) {
        // 若配置已存在，根据配置注入css
      } else {
        // 若配置不存在，生成新配置
      }

      // if (result.whiteList.includes()) {
      //   // @ts-ignore
      //   chrome.scripting.removeCSS({
      //     target: { tabId },
      //     files: ["inject.css"],
      //   });
      // } else {
      //   chrome.scripting.insertCSS({
      //     target: { tabId },
      //     files: ["inject.css"],
      //   });
      // }
    });
  }
});

chrome.storage.onChanged.addListener(async (changes) => {
  const tab = await getCurrentTab();
  if (changes.whiteList?.newValue && tab?.url.startsWith("http")) {
    if (changes.whiteList?.newValue.includes(getDomain(tab?.url))) {
      // @ts-ignore
      chrome.scripting.removeCSS({
        target: { tabId: tab.id },
        files: ["inject.css"],
      });
    } else {
      chrome.scripting.insertCSS({
        target: { tabId: tab.id },
        files: ["inject.css"],
      });
    }
  }
});
