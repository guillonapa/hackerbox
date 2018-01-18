var React = require('react');
var ReactDOM = require('react-dom');
var Rebase = require('re-base');
var firebase = require('firebase');
var app = firebase.initializeApp({
  databaseURL: "https://hacker-news.firebaseio.com/"
});
var base = Rebase.createClass(app.database());
import { App } from '../app/components/App.js';

function getTopStories(){
  base.fetch('v0/topstories', {
    context: this,
    asArray: true,
    then(data){
      console.log(data);
      getMostRecentStories(data);

    }
  });
}

function getMostRecentStories(topStories){
  base.fetch('v0/newstories', {
    context: this,
    asArray: true,
    then(data){
      console.log(data);
      ReactDOM.render(
        <App topStories={topStories} mostRecent={data} base={base} />,
        document.getElementById('space')
      );
    }
  });
}



getTopStories();
