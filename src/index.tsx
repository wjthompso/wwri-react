import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "tailwindcss/tailwind.css";
import AppRoutes from "./apps/public-website/routes/AppRoutes";

const container = document.getElementById("root") as HTMLDivElement;
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>,
);
