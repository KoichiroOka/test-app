import "./App.css";

import { useTest } from "./hooks/useTest";
import { useCallback } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import TestRouter from "./TestRouter";

function App() {
  const { getAgRowData } = useTest();

  const onTest = useCallback(() => {
    getAgRowData();
  }, []);
  return (
    <Router basename="vbdb2ui-web">
      <div className="App">
        <header className="App-header">
          <TestRouter />
        </header>
      </div>
    </Router>
  );
}

export default App;
