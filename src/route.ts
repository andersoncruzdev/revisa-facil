import { createElement } from "react";
import type { RouteObject } from "react-router-dom";
import ClassroomPage from "@pages/Classroom";
import RootPage from "@pages/Root";

export const routes = [
  {
    path: "/",
    element: createElement(RootPage),
    children: [
      {
        index: true,
        element: createElement("h1", null, "Dashboard"),
      },
      {
        path: "classrooms",
        element: createElement(ClassroomPage),
      },
    ],
  },
] satisfies RouteObject[];
