import { Classes, Colors } from '@blueprintjs/core';

const React = require('react');

const Footer = () => {
    return (
        <div className={`${Classes.DRAWER_FOOTER} hb-footer`} style={{ color: Colors.GRAY3 }}>
            <h4>&copy; Guillermo Narvaez (2017-2020)</h4>
            <h4>
                <a className="footer-icons" href="https://github.com/guillonapa/hackerbox" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-github"/>
                </a>
                &nbsp;&nbsp;&nbsp;
                <a className="footer-icons" href="https://www.linkedin.com/in/g-narvaez" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-linkedin"/>
                </a>
                &nbsp;&nbsp;&nbsp;
                <a className="footer-icons" href="https://guillonapa.github.io/" target="_blank" rel="noopener noreferrer">
                    <i className="fas fa-desktop"/>
                </a>
            </h4>
        </div>
    );
};

export default Footer;
