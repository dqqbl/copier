import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import { getCurrentTab, getDomain, getSyncState } from "../utils";
import "./style.css";

const Popup = () => {
  const [domain, setDomain] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    getCurrentTab().then((tab) => {
      const curDomain = getDomain(tab.url);
      setDomain(curDomain);
      //@ts-ignore
      getSyncState(["whiteList"], ({ whiteList }) => {
        setIsChecked(!whiteList.includes(curDomain));
      });
    });
  }, []);

  const handleChecked = (e) => {
    setIsChecked(e.target.checked);
    // @ts-ignore
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
      <div className="header card">
        <h1>Copier</h1>
        <span>C</span>
      </div>
      <div className="card">
        <div className="item handler">
          <label>此网站</label>
          <input type="checkbox" onChange={handleChecked} checked={isChecked} />
        </div>
        <div id="current-domain" className="item">
          {domain}
        </div>
      </div>
    </>
  );
};

ReactDOM.render(<Popup />, document.getElementById("root"));
