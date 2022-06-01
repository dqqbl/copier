import React, { useEffect, useState } from "react";
import Form, { Field } from "rc-field-form";
import ReactDOM from "react-dom";
import { getCurrentTab, getDomain, getSyncState } from "../utils";
import "./style.less";

const Popup = () => {
  const [domain, setDomain] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [form] = Form.useForm();

  const [config, setConfig] = useState({
    whiteList: false,
    copy: true,
    expand: true,
  });

  useEffect(() => {
    getCurrentTab().then((tab) => {
      const curDomain = getDomain(tab.url);
      setDomain(curDomain);
      getSyncState([curDomain], (store) => {
        if (store[curDomain]) {
          form.setFieldsValue(store[curDomain]);
          // setConfig(store[curDomain]);
        }
      });
    });
  }, []);

  // const handleChecked = (e) => {
  //   setIsChecked(e.target.checked);
  //   getSyncState(["whiteList"], ({ whiteList }) => {
  //     let temp = [...whiteList];
  //     if (e.target.checked) {
  //       temp = whiteList.filter((i) => i !== domain);
  //     } else {
  //       temp.push(domain);
  //     }
  //     chrome.storage.sync.set({ whiteList: temp });
  //   });
  // };

  return (
    <>
      <header className="card">
        <h1>Copier</h1>
        <span>C</span>
      </header>
      <main>
        <Form>
          <div className="card">
            <div className="item">
              <label className="domain">此网站</label>
              <Field name="whiteList">
                <input type="checkbox" />
              </Field>
            </div>
            <div className="item domain">{domain}</div>
          </div>
          <div className="card">
            <div className="item">
              <label>可复制</label>
              <Field name="copy">
                <input type="checkbox" />
              </Field>
            </div>
            <div className="item">
              <label>自动展开</label>
              <Field name="expand">
                <input type="checkbox" />
              </Field>
            </div>
          </div>
        </Form>
      </main>
    </>
  );
};

ReactDOM.render(<Popup />, document.getElementById("root"));
