import { StrictMode } from "react";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./libs/react-query";

import { RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { router } from "./route";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
