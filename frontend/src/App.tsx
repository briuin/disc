import { useEffect, useState } from "react";
import "./App.scss";
import BasicInfo from "./components/BasicInfo/BasicInfo.lazy";
import DISC from "./components/DISC/DISC.lazy";
import Pagination from "./components/Pagination/Pagination.lazy";

interface Questions {
  title: string;
  required: boolean;
  questions: string[];
}

function App() {
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

  const submit = () => {
    if (results.some((x) => x.some((r) => !r))) {
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
    }).then((response) => response.json());
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
    <div className="App">
      {stepMappers.find((x) => x.step === step)?.component}
      <Pagination
        totalPages={2}
        page={step}
        gotoPage={(step) => setStep(step)}
        submit={submit}
      />
    </div>
  );
}

export default App;
