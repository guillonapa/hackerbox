import { AdditionalView } from "./AdditionalView.js";
import 'bootstrap'

var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

export class Header extends React.Component {

  handleClick() {
    window.open('https://github.com/guillonapa/hackerbox', '_blank');
  }

  handleQuestionClick() {
    // window.alert('We are still working on the site... for now, you can drag cards around and you can see the latest and top stories as featured in Hacker News!');
    $('#exampleModalCenter').modal('toggle');
  }

  handleMenuClick() {
      document.getElementById('menu').style.width = "250px";
      // document.getElementById('main').style.marginRight = "250px";
      document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
  }

  // handleColorClick() {
  //   let newColorIndex = (this.state.colorIndex + 1)%numColors;
  //   let newColor = colors[newColorIndex];
  //   this.setState({ color: newColor, colorIndex: newColorIndex });
  // }

  handleAdditionalView() {
    ReactDOM.render(
      <AdditionalView />, document.getElementById("space")
    );
  }

  render() {
    return (
      <div className="row" style={{height: '8vh', paddingTop: '10px', paddingLeft: '10px', paddingRight: '10px' }}>
        <div className="col" style={{ paddingLeft: '30px' }}>
          <span className="head-h1"><span className="title" onClick={this.handleClick}><i className="fas fa-archive"></i> Hacker Box<span id="secondary-title"></span></span></span>
        </div>
        <div className="col icons-col">
          <span className="menu-icons head-h1">
            {/* <span className="additional-view title" onClick={this.handleAdditionalView}>
              <i className="fas fa-eye"></i>
            </span>&nbsp;&nbsp; */}
            <span className="title" onClick={this.handleQuestionClick}>
              <i className="far fa-question-circle"></i>
            </span>&nbsp;&nbsp;
            <span className="title" onClick={this.handleMenuClick}>
              <i className="fas fa-bars"></i>
            </span>
          </span>
        </div>
      </div>
    );
  }

}
