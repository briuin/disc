import React from "react";
import styles from "./TitleSection.module.scss";

export interface TitleSectionProps {
  title: string;
  description: any;
  layout?: "Half" | "";
}

const TitleSection: React.FC<TitleSectionProps> = (
  props: TitleSectionProps
) => {
  const header =
    props.layout === "Half" ? (
      <div className={styles[props.layout!]}>
        <div>{props.title}</div>
      </div>
    ) : (
      <h1>{props.title}</h1>
    );

  return (
    <div className={`${styles.TitleSection} ${styles[props.layout!]}`}>
      {header}
      <div className={styles[props.layout!]}>
        <p>{props.description}</p>
      </div>
    </div>
  );
};

export default TitleSection;
