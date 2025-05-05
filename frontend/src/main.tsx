import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import configureAxios from "./config/interceptor.ts";

configureAxios();

createRoot(document.getElementById("root")!).render(<App />);
