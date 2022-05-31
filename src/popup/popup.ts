import { getCurrentTab, getDomain, getSyncState } from "../utils";

/** 初始化popup，获取当前域名 */
const initPopup = async () => {
  const tab = await getCurrentTab();
  const domain = getDomain(tab.url);
  const domainDiv = document.getElementById("current-domain");
  const popupForm = document.getElementById("popupForm");
  let text = document.createTextNode(domain);
  domainDiv.appendChild(text);
  // @ts-ignore
  getSyncState(["whiteList"], ({ whiteList }) => {
    // @ts-ignore
    popupForm.isOpen.checked = !whiteList.includes(domain);
  });
  // @ts-ignore
  popupForm.isOpen.addEventListener("change", (event) => {
    // @ts-ignore
    getSyncState(["whiteList"], ({ whiteList }) => {
      let temp = [...whiteList];
      if (event.target.checked) {
        temp = whiteList.filter((i) => i !== domain);
      } else {
        temp.push(domain);
      }
      chrome.storage.sync.set({ whiteList: temp });
    });
  });
};

initPopup();
