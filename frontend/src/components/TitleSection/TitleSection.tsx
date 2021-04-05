import React from "react";
import styles from "./TitleSection.module.scss";

export interface TitleSectionProps {
  title: string;
  description: string;
}

const TitleSection: React.FC<TitleSectionProps> = (
  props: TitleSectionProps
) => (
  <div className={styles.TitleSection}>
    <h1>{props.title}</h1>
    <p>{props.description}</p>
  </div>
);

export default TitleSection;
