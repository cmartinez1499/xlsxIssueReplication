import React from "react";
import { render } from "react-dom";
import Root from "./Root";
import "url-search-params-polyfill";
import "@babel/polyfill";

render(<Root />, document.getElementById("root"));
