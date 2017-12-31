var React = require('react');
var ReactDOM = require('react-dom');

export class Header extends React.Component {

  handleClick() {
    window.open('https://github.com/guillonapa/react-ion', '_blank');
  }

  render() {
    return (
      <div className="row">
        <div className="col">
          <h1><span className="title" onClick={this.handleClick}>Hacker <i className="fas fa-chevron-right"></i> <span id="secondary-title">React <i className="fab fa-react" style={{color: '#E10000'}} id="react-logo" ></i></span></span></h1>
        </div>
        <div className="col-md-auto">
          <h1><span className="title"><i className="far fa-question-circle"></i></span>&nbsp;&nbsp;<span className="title"><i className="fas fa-bars"></i></span></h1>
        </div>
      </div>
    );
  }

}
