var React = require('react');

var url = 'https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=17eb61e8bd484e17b7ad33c4428ebfc4';
var req = new Request(url);
fetch(req)
    .then(function(response) {
        console.log("[INFO] Here comes the json...");
        console.log(response.json());
    })

export class AdditionalView extends React.Component {
    render() {
        return (
            <div style={{ paddingLeft: '30px', paddingRight: '30px', paddingTop: '0px', height: '100vh' }}>
            <h1>Hello world! This page is under construction...</h1>
            </div>
            
        );
    }
}