import { getCurrentTab, getDomain, getSyncState } from "../utils.js";

/** 初始化popup，获取当前域名 */
const initPopup = async () => {
  const tab = await getCurrentTab();
  const domain = getDomain(tab.url);
  const domainDiv = document.getElementById("current-domain");
  const popupForm = document.getElementById("popupForm");

  var text = document.createTextNode(domain);
  domainDiv.appendChild(text);

  getSyncState(["whiteList"], ({ whiteList }) => {
    popupForm.isOpen.checked = !whiteList.includes(domain);
  });

  popupForm.isOpen.addEventListener("change", (event) => {
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
