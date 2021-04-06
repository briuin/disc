import { TextField } from "@material-ui/core";
import React from "react";
import InputSection from "../InputSection/InputSection.lazy";
import TitleSection from "../TitleSection/TitleSection.lazy";
import styles from "./BasicInfo.module.scss";

export interface BasicInfoProps {
  username: string;
  setName: (name: string) => void;
  position: string;
  setPosition: (position: string) => void;
}

const BasicInfo: React.FC<BasicInfoProps> = (props) => {

  return (
    <div className={styles.BasicInfo}>
      <TitleSection title={'DISC人格特質分析'} description={'此性向測驗僅為人格特質分析參考，不影響錄取結果'}></TitleSection>
      <form className={styles.Form} noValidate autoComplete="off">
        <InputSection>
          <TextField
            label="我的名字是"
            placeholder="您的回答"
            value={props.username}
            onChange={(event) => props.setName(event.target.value)}
          />
        </InputSection>
        <InputSection>
          <TextField
            label="我要應徵的職位是"
            placeholder="您的回答"
            value={props.position}
            onChange={(event) => props.setPosition(event.target.value)}
          />
        </InputSection>
      </form>
    </div>
  );
};

export default BasicInfo;
