import { TextField } from "@material-ui/core";
import React, { useState } from "react";
import InputSection from "../InputSection/InputSection.lazy";
import TitleSection from "../TitleSection/TitleSection.lazy";
import styles from "./BasicInfo.module.scss";

const BasicInfo: React.FC = () => {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");

  return (
    <div className={styles.BasicInfo}>
      <TitleSection title={'DISC人格特質分析'} description={'此性向測驗僅為人格特質分析參考，不影響錄取結果'}></TitleSection>
      <form className={styles.Form} noValidate autoComplete="off">
        <InputSection>
          <TextField
            label="我的名字是"
            placeholder="您的回答"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </InputSection>
        <InputSection>
          <TextField
            label="我要應徵的職位是"
            placeholder="您的回答"
            value={position}
            onChange={(event) => setPosition(event.target.value)}
          />
        </InputSection>
      </form>
    </div>
  );
};

export default BasicInfo;
