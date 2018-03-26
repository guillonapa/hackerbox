var React = require('react');

export class Footer extends React.Component {

  handleGitHub() {
    window.open('https://github.com/guillonapa', '_blank');
  }

  handleLinkedIn() {
    window.open('https://www.linkedin.com/in/g-narvaez', '_blank');
  }

  handleSite() {
    window.open('https://guillonapa.github.io/', '_blank');
  }

  render() {
    return (
      <div className="row" style={{paddingTop: '15px', height: '8vh'}}>
        <div className="col">

        </div>
        <div className="col-md-auto">
          <h6>&copy; Guillermo Narvaez (2017-2018)&nbsp;&nbsp;&nbsp;<span className="footer-icons" onClick={this.handleGitHub}><i className="fab fa-github"></i></span>&nbsp;&nbsp;&nbsp;<span className="footer-icons" onClick={this.handleLinkedIn}><i className="fab fa-linkedin"></i></span>&nbsp;&nbsp;&nbsp;<span className="footer-icons" onClick={this.handleSite}><i className="fas fa-desktop"></i></span></h6>
        </div>
      </div>
    );
  }

}
