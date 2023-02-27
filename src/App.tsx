import "./App.css";
import { useRoutes } from "react-router-dom";
import {
  About,
  Contact,
  Events,
  History,
  Home,
  Location,
  Products,
  Services,
  Whoops404,
} from "./page";
import { Logo } from "./commponents/Logo";

function App() {
  const element = useRoutes([
    { path: "/", element: <Home /> },
    {
      path: "about",
      element: <About />,
      children: [
        {
          path: "services",
          element: <Services />,
        },
        { path: "history", element: <History /> },
        {
          path: "location",
          element: <Location />,
        },
      ],
    },
    { path: "events", element: <Events /> },
    { path: "products", element: <Products /> },
    { path: "contact", element: <Contact /> },
    { path: "*", element: <Whoops404 /> },
  ]);
  const onTest = () => {
    console.log(process.env.PUBLIC_URL);
  };
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={onTest}>onTest</button>
        <>{element}</>
      </header>
    </div>
  );
}

export default App;
