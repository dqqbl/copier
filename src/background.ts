import { getCurrentTab, getDomain } from './utils';

/** 安装初始化 */
chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === chrome.runtime.OnInstalledReason.INSTALL) {
    chrome.storage.sync.set({
      whiteList: [],
    });
    // chrome.tabs.create({
    //   url: "boarding/index.html",
    // });
  }
});

/** 监听域名变动 */
chrome.webNavigation.onCommitted.addListener((details) => {
  const { url, tabId, frameId } = details;
  if (details?.url.startsWith('http')) {
    chrome.storage.sync.get(['whiteList'], (result) => {
      if (result.whiteList.includes(getDomain(url))) {
        // @ts-ignore
        chrome.scripting.removeCSS({
          target: { tabId },
          files: ['inject.css'],
        });
        // 仅主页面注入一次，避免重复注入
      } else if (frameId === 0) {
        chrome.scripting.insertCSS({
          target: { tabId },
          files: ['inject.css'],
        });
        chrome.scripting.executeScript({
          target: { tabId },
          func: disableCopyPopup,
        });
      }
    });
  }
});

chrome.storage.onChanged.addListener(async (changes) => {
  const tab = await getCurrentTab();
  if (changes.whiteList?.newValue && tab?.url.startsWith('http')) {
    if (changes.whiteList?.newValue.includes(getDomain(tab?.url))) {
      // @ts-ignore
      chrome.scripting.removeCSS({
        target: { tabId: tab.id },
        files: ['inject.css'],
      });
    } else {
      chrome.scripting.insertCSS({
        target: { tabId: tab.id },
        files: ['inject.css'],
      });
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: disableCopyPopup,
      });
    }
  }
});

const disableCopyPopup = () => {
  window.addEventListener('copy', (e) => {
    //取消默认复制
    // e.preventDefault();
    e.stopPropagation();
    // let content = window.getSelection();
    //获取复制的text
    // let textContent = content.toString();
    //获取复制的html
    // let htmlContent = content.getRangeAt(0).cloneContents();
    // //@ts-ignore 给剪切板赋值
    // e.clipboardData.setData('text/plain', textContent);
  }, true);
};