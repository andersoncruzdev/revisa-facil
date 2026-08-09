import { createElement } from "react";
import type { RouteObject } from "react-router-dom";
import RootPage from "@pages/Root";
import HomePage from "@features/home";
import ContentPage from "@features/content";
import IntervalsPage from "@features/intervalos";
import SubjectPage from "@features/subject/Subject";

export const routes = [
  {
    path: "/",
    element: createElement(RootPage),
    children: [
      {
        index: true,
        element: createElement(HomePage),
      },
      {
        path: "content",
        element: createElement(ContentPage),
      },
      {
        path: "performance",
        element: createElement(HomePage),
      },
      {
        path: "intervalos",
        element: createElement(IntervalsPage),
      },
      {
        path: "subjects",
        element: createElement(SubjectPage),
      },
    ],
  },
] satisfies RouteObject[];
