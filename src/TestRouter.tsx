import React from "react";
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

const TestRouter = () => {
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
  return <div>{element}</div>;
};

export default TestRouter;
