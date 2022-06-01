// chrome.storage;
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

export const setSyncState = (
  items: { [key: string]: any },
  callback: () => void = () => {}
) => {
  chrome.storage.sync.set(items, callback);
};

export const getSyncState = (
  keys: string | string[] | { [key: string]: any } | null,
  callback: (items: { [key: string]: any }) => void = () => {}
) => {
  chrome.storage.sync.get(keys, callback);
};
