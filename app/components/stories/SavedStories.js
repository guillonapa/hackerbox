var React = require('react');
import { Card } from './Card'

const storiesColor = '#E3E3E3';
var cards = null;

export class SavedStories extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="card" style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}>
        <div style={{paddingLeft: '20px', paddingTop: '15px', paddingBottom: '15px', background: storiesColor}}><h3><i className={this.props.icon}></i>&nbsp;&nbsp; {this.props.title}</h3></div>
        <div className="card-body" style={{position: 'relative', height: '64vh', overflowY: 'scroll', background: storiesColor}}>
          <div id="list-example" className="list-group"></div>
          <div id={this.props.id} dataSpy="scroll" dataTarget="#list-example" dataOffset="0" className="scrollspy-example" style={{minHeight: '60vh', background: storiesColor}}></div>
        </div>
      </div>
    );
  }
}
