import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { ToastContainer } from "react-toastify";
import "./styles/Index.scss";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <StrictMode>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          theme="dark"
        />
        <App />
      </StrictMode>
    </BrowserRouter>
  </Provider>
);
