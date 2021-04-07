import { Radio } from "@material-ui/core";
import React from "react";
import InputSection from "../InputSection/InputSection";
import TitleSection from "../TitleSection/TitleSection.lazy";
import styles from "./DISC.module.scss";

interface Questions {
  title: string;
  required: boolean;
  questions: string[];
}
export interface DISCProps {
  questions: Questions[];
  results: number[][];
  setResults: (results: number[][]) => void;
  hasError?: boolean;
  clearError?: () => void;
}

const DISC: React.FC<DISCProps> = (props) => {
  const options = ["最像自己", "次像自己", "有點像自己", "不像自己"];
  const optionValues = [9, 6, 3, 0];
  const optionsHeaders = options.map((x) => <th key={`th${x}`}>{x}</th>);
  const optionsBody = (questionSectionIndex: number, questionIndex: number) =>
    options.map((x, i) => (
      <td key={`td${x}`}>
        <Radio
          checked={props.results[questionSectionIndex][questionIndex] === optionValues[i]}
          value={optionValues[i]}
          name={`question${questionIndex}`}
          onChange={(event) => {
            props.clearError!();
            const r = [...props.results];
            r[questionSectionIndex][questionIndex] = Number(event.target.value);
            props.setResults(r);
          }}
        />
      </td>
    ));

  const errors = props.hasError
    ? props.results.map((x, i) =>
        x.some((r) => r === undefined) ? (
          <div key={`error${i}`} style={{ color: "red", fontSize: "12px", marginTop: "15px" }}>
            在這個問題中，你必須針對每一列選取一個回覆
          </div>
        ) : (
          <div></div>
        )
      )
    : "";
  const description = <span style={{ color: "red" }}>*必填</span>;
  const inputSections =
    props.questions.length === 0
      ? ""
      : props.questions.map((x, i) => {
          const questionTr = x.questions.map((question, questionIndex) => (
            <tr key={question}>
              <td>{question}</td>
              {optionsBody(i, questionIndex)}
            </tr>
          ));
          return (
            <InputSection key={`question${i}`}>
              <div>
                <div>
                  {i + 1}.{x.title}{" "}
                  {x.required ? <span style={{ color: "red" }}>*</span> : ""}
                </div>
                <div>
                  <table>
                    <thead>
                      <tr>
                        <th></th>
                        {optionsHeaders}
                      </tr>
                    </thead>
                    <tbody>{questionTr}</tbody>
                  </table>
                </div>
                { errors[i] }
              </div>
            </InputSection>
          );
        });

  return (
    <div className={styles.DISC}>
      <TitleSection
        title={"DISC人格特質分析"}
        description={description}
      ></TitleSection>
      <TitleSection
        layout={"Half"}
        title={"DISC人格特質分析"}
        description={
          "總共有十題，請依據題目依序選出最像自己、次像自己、有點像自己以及不像自己的選項"
        }
      ></TitleSection>
      {inputSections}
    </div>
  );
};

export default DISC;
