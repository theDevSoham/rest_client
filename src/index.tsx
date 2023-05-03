/* @refresh reload */
import { render } from "solid-js/web";

import "./index.css";
import App from "./App";
import { Router } from "@solidjs/router";
import { axiosInstance } from "./components/AxiosConfig/axiosConfig";

const updateTime = (response: any) => {
  response.config.metadata.endTime = new Date();
  response.duration =
    response.config.metadata.endTime - response.config.metadata.startTime;
  return response;
};

axiosInstance.interceptors.request.use((config: any) => {
  config.metadata = { startTime: new Date() };
  return config;
});

axiosInstance.interceptors.response.use(updateTime, e => {
  return Promise.reject(updateTime(e.response));
});

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got mispelled?"
  );
}

render(
  () => (
    <Router>
      <App />
    </Router>
  ),
  root!
);
