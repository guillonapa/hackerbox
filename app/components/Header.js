var React = require('react');
var ReactDOM = require('react-dom');

export class Header extends React.Component {

  handleClick() {
    window.open('https://github.com/guillonapa/react-ion', '_blank');
  }

  handleQuestionClick() {
    // window.alert('We are still working on the site... for now, you can drag cards around and you can see the latest and top stories as featured in Hacker News!');
    $('#exampleModalCenter').modal('toggle');
  }

  handleMenuClick() {
    var elem = document.getElementById('menu');
    if (elem.style.display === 'none') {
      elem.style.display = 'block';
    } else {
      elem.style.display = 'none';
    }
  }

  render() {
    return (
      <div className="row" style={{height: '8vh'}}>
        <div className="col">
          <h1 className="head-h1"><span className="title" onClick={this.handleClick}>Hacker <i className="fas fa-chevron-right"></i> <span id="secondary-title">React <i className="fab fa-react" style={{color: '#E10000'}} id="react-logo" ></i></span></span></h1>
        </div>
        <div className="col-md-auto">
          <h3><span className="title" onClick={this.props.onClick}><i className="fas fa-edit"></i></span>&nbsp;&nbsp;<span className="title" onClick={this.handleQuestionClick}><i className="far fa-question-circle"></i></span>&nbsp;&nbsp;<span className="title" onClick={this.handleMenuClick}><i className="fas fa-bars"></i></span></h3>
        </div>
      </div>
    );
  }

}
