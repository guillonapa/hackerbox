import { Classes, Colors } from '@blueprintjs/core';

var React = require('react');

export class Footer extends React.Component {

  handleGitHub() {
    window.open('https://github.com/guillonapa/hackerbox', '_blank');
  }

  handleLinkedIn() {
    window.open('https://www.linkedin.com/in/g-narvaez', '_blank');
  }

  handleSite() {
    window.open('https://guillonapa.github.io/', '_blank');
  }

  render() {
    return (
      <div className={Classes.DRAWER_FOOTER + " hb-footer"} style={{color: Colors.GRAY3}}>
        <h4>
          &copy;
          Guillermo Narvaez (2017-2018)
        </h4>
        <h4>
          <a className="footer-icons" href="https://github.com/guillonapa/hackerbox" target="_blank" rel="noopener noreferrer"><i className="fab fa-github"></i></a>
          &nbsp;&nbsp;&nbsp;
          <a className="footer-icons" href="https://www.linkedin.com/in/g-narvaez" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>
          &nbsp;&nbsp;&nbsp;
          <a className="footer-icons" href="https://guillonapa.github.io/" target="_blank" rel="noopener noreferrer"><i className="fas fa-desktop"></i></a>
        </h4>
      </div>
    );
  }

}
