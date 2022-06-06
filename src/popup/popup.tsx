import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { getCurrentTab, getDomain, getSyncState } from "../utils";
import "./style.less";

const Popup = () => {
  const [domain, setDomain] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    getCurrentTab().then((tab) => {
      const curDomain = getDomain(tab.url);
      setDomain(curDomain);
      getSyncState(["whiteList"], ({ whiteList }) => {
        setIsChecked(!whiteList.includes(curDomain));
      });
    });
  }, []);

  const handleChecked = (e) => {
    setIsChecked(e.target.checked);
    getSyncState(["whiteList"], ({ whiteList }) => {
      let temp = [...whiteList];
      if (e.target.checked) {
        temp = whiteList.filter((i) => i !== domain);
      } else {
        temp.push(domain);
      }
      chrome.storage.sync.set({ whiteList: temp });
    });
  };

  return (
    <>
      <header className="card">
        <h1>Copier</h1>
        <span>C</span>
      </header>
      <main>
        <div className="card">
          <div className="item">
            <label className="domain">此网站</label>
            <input
              type="checkbox"
              onChange={handleChecked}
              checked={isChecked}
            />
          </div>
          <div className="item domain">{domain}</div>
        </div>
      </main>
    </>
  );
};

ReactDOM.render(<Popup />, document.getElementById("root"));
