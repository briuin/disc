import React, { Fragment, useEffect, useState } from "react";
import "./App.scss";
import BasicInfo from "./components/BasicInfo/BasicInfo.lazy";
import DISC from "./components/DISC/DISC.lazy";
import Pagination from "./components/Pagination/Pagination.lazy";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
} from "react-router-dom";
import { Card, CardContent, Typography } from "@material-ui/core";
import TitleSection from "./components/TitleSection/TitleSection.lazy";

interface Questions {
  title: string;
  required: boolean;
  questions: string[];
}

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/feedback">
            <Feedback />
          </Route>
          <Route path="/done">
            <Done />
          </Route>
          <Route path="/">
            <Home />
          </Route>
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
}

function Done() {
  return (
    <TitleSection
      title={`DISC人格特質分析`}
      description={`謝謝你的配合`}
    ></TitleSection>
  );
}

interface Record {
  id: string;
  name: string;
  position: string;
  time: string;
  results: number[][];
}

function Feedback() {
  const [records, setRecords] = useState<Record[]>([]);
  useEffect(() => {
    fetch("/getRecords")
      .then((response) => response.json())
      .then((json) => {
        setRecords(json);
      });
  }, []);

  const list = records.map((record) => {
    const totalScore = {
      D: record.results.reduce((p, c) => p + (c[0] || 0), 0),
      I: record.results.reduce((p, c) => p + (c[1] || 0), 0),
      S: record.results.reduce((p, c) => p + (c[2] || 0), 0),
      C: record.results.reduce((p, c) => p + (c[3] || 0), 0),
    };

    const maxValue = Math.max(...Object.values(totalScore));

    const generateScoreElement = (score: number) => {
      if (score === maxValue) {
        return (
          <span style={{ color: "blue", fontWeight: 600, fontSize: "30px" }}>
            {score}
          </span>
        );
      }

      return <span style={{ fontSize: "30px" }}>{score}</span>;
    };

    const resultElement = Object.keys(totalScore).map((x, i) => (
      <div
        key={`resultElement${i}`}
        style={{
          height: "80px",
          flexBasis: "50%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ fontSize: "16px" }}>{x}</div>
        {generateScoreElement((totalScore as any)[x])}
      </div>
    ));

    const formattedDate = new Date(record.time).toLocaleString();

    return (
      <Card
        key={`${record.id}`}
        className="root"
        style={{
          maxWidth: "calc(50% - 20px)",
          margin: "10px",
          display: "flex",
        }}
      >
        <CardContent>
          <Typography className="title" color="textSecondary" gutterBottom>
            {record.position}
          </Typography>
          <Typography variant="h5" component="h2">
            {record.name}
          </Typography>
          <Typography className="pos" color="textSecondary">
            {formattedDate}
          </Typography>
          <Typography variant="body2" component="div">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              {resultElement}
            </div>
          </Typography>
        </CardContent>
      </Card>
    );
  });

  return <div style={{ display: "flex" }}>{list}</div>;
}

function Home() {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [questions, setQuestions] = useState<Questions[]>([]);
  const [results, setResults] = useState<number[][]>([]);
  useEffect(() => {
    fetch("questions.json")
      .then((response) => response.json())
      .then((json) => {
        setResults(
          Array.from({ length: json.length })
            .fill(0)
            .map((x, i) => Array.from({ length: json[i].questions.length }))
        );
        setQuestions(json);
      });
  }, []);

  const [step, setStep] = useState(1);
  const [hasError, setHasError] = useState(false);
  const history = useHistory();

  const submit = () => {
    if (results.some((x) => x.some((r) => r === undefined))) {
      setHasError(true);
      return;
    }
    fetch("addRecord", {
      method: "POST",
      body: JSON.stringify({
        results,
        name,
        position,
      }),
      headers: {
        "content-type": "application/json",
      },
    }).then((response) => response.json()).then(() => history.push('/done'));
  };

  const stepMappers = [
    {
      step: 1,
      component: (
        <BasicInfo
          username={name}
          position={position}
          setName={(name) => {
            setName(name);
          }}
          setPosition={(position) => {
            setPosition(position);
          }}
        />
      ),
    },
    {
      step: 2,
      component: (
        <DISC
          questions={questions}
          results={results}
          setResults={setResults}
          hasError={hasError}
          clearError={() => {
            setHasError(false);
          }}
        />
      ),
    },
  ];

  return (
    <Fragment>
      {stepMappers.find((x) => x.step === step)?.component}
      <Pagination
        totalPages={2}
        page={step}
        gotoPage={(step) => setStep(step)}
        submit={submit}
      />
    </Fragment>
  );
}

export default App;
