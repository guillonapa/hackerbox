import { App } from "./react-components/App";
import { Menu } from "./react-components/sections/Menu";
import { Header } from "./react-components/sections/Header";

var React = require("react");
var ReactDOM = require("react-dom");
var Rebase = require("re-base");
var firebase = require("firebase");
var app = firebase.initializeApp({
  databaseURL: "https://hacker-news.firebaseio.com/"
});
var base = Rebase.createClass(app.database());

function getTopStories() {
  base.fetch("v0/topstories", {
    context: this,
    asArray: true,
    then(data) {
      console.log(data);
      getMostRecentStories(data);
    }
  });
}

function getMostRecentStories(topStories) {
  base.fetch("v0/newstories", {
    context: this,
    asArray: true,
    then(data) {
      console.log(data);
      ReactDOM.render(
        <App topStories={topStories} mostRecent={data} base={base} />,
        document.getElementById("space")
      );
    }
  });
}

getTopStories();
ReactDOM.render(<Menu />, document.getElementById("menu"));
ReactDOM.render(<Header />, document.getElementById("header"));

var url = 'https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=17eb61e8bd484e17b7ad33c4428ebfc4';
var req = new Request(url);
fetch(req)
    .then(function(response) {
        console.log("Here comes the json...");
        console.log(response.json());
    })
