/** 获取当前tab信息 */
export async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

/** 获取域名 */
export const getDomain = (url) => {
  return (url || "").match(/(?<=(http|https):\/\/).+?(?=\/)/)[0];
};

export const setSyncState = (obj, fn = () => {}) => {
  chrome.storage.sync.set(obj, fn);
};

export const getSyncState = (keys, fn = () => {}) => {
  chrome.storage.sync.get(keys, fn);
};
