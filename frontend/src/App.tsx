import { useEffect, useState } from "react";
import "./App.scss";
import BasicInfo from "./components/BasicInfo/BasicInfo.lazy";
import DISC from "./components/DISC/DISC.lazy";
import Pagination from "./components/Pagination/Pagination.lazy";

function App() {
  useEffect(() => {
    fetch("/getnames/")
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
      });
  });

  const [step, setStep] = useState(1);

  const stepMappers = [
    { step: 1, component: <BasicInfo /> },
    { step: 2, component: <DISC /> },
  ];

  return (
    <div className="App">
      {stepMappers.find((x) => x.step === step)?.component}
      <Pagination totalPages={2} page={step} gotoPage={(step) => setStep(step)}/>
    </div>
  );
}

export default App;
