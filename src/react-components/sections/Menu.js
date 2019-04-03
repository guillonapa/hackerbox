import Emoji from "a11y-react-emoji";

var React = require("react");
var $ = require('jquery');

export class Menu extends React.Component {
  handleHomeClick() {
    window.open(".", "_self");
  }

  handleProfileClick() {
    $("#menuPopup").toggle("toggle");
    $("#menuPopup").modal("toggle");
  }

  handleSettingsClick() {
    $("#menuPopup").modal("toggle");
  }

  handleSitesClick() {
    window.open("http://www.ycombinator.com/", "_blank");
  }

  handleCloseMenuClick() {
    document.getElementById("menu").style.width = "0";
    // document.getElementById('main').style.marginLeft= "0";
    document.body.style.backgroundColor = "white";
  }

  render() {
    return (
      <div className="row" style={{ padding: "20px" }}>
        <div className="col">
          <h2>
            <span className="title closebtn" onClick={this.handleCloseMenuClick}>
              <i className="far fa-times-circle" />
            </span>
          </h2>
          <br />
          <br />
          <h1>Menu</h1>
          <br />
          <h3 className="menu-subtitle" onClick={this.handleHomeClick}>
            <Emoji symbol="🏠" /> Home
          </h3>
          <h3 className="menu-subtitle" onClick={this.handleProfileClick}>
            <Emoji symbol="😎" /> Profile
          </h3>
          <h3 className="menu-subtitle" onClick={this.handleSettingsClick}>
            ️<Emoji symbol="⚙" /> Settings
          </h3>
          <h3 className="menu-subtitle" onClick={this.handleSitesClick}>
            <Emoji symbol="🌎" /> Sites
          </h3>
        </div>
      </div>
    );
  }
}
