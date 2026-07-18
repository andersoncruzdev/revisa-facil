import { createElement } from "react";
import type { RouteObject } from "react-router-dom";
import RootPage from "@pages/Root";
import HomePage from "@features/home";
import ContentPage from "@features/content";
import NotesPage from "@features/notes";
import IntervalsPage from "@features/intervalos";
import ClassroomPage from "@features/classroom/Classroom";

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
        path: "notes",
        element: createElement(NotesPage),
      },
      {
        path: "intervalos",
        element: createElement(IntervalsPage),
      },
      {
        path: "classrooms",
        element: createElement(ClassroomPage),
      },
    ],
  },
] satisfies RouteObject[];
