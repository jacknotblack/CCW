import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { store } from './app/store';
import routes from "./routes";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Navigate replace to="/list" />} />
        <Route path="/" element={<App />}>
          {routes.map(({ name, component: RouteComponent, ...routeProps }) => {
            return (
              <Route
                {...routeProps}
                key={`route-${name}`}
                element={<RouteComponent />}
              />
            );
          })}
          <Route path="*" element={<Navigate replace to="/" />} />
        </Route>
      </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
