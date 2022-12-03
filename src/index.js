import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/App";
import MarvelService from "./services/MarvelService";

import "./style/style.scss";

//creating new exemplar or class
const marvelService = new MarvelService();

//using it with method
//getting array of results
marvelService
  .getAllCharacters()
  .then((res) => res.data.results.forEach((item) => console.log(item.name)));

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
