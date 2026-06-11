import { createElement } from "react";
import { createHashRouter, type RouteObject } from "react-router-dom";
import App from "./App";

export const routes = [
  {
    path: "/",
    element: createElement(App),
    children: [
      {
        path: "dashboard",
        element: createElement(App),
      }
    ],
  },
] satisfies RouteObject[];

export const router = createHashRouter(routes);
