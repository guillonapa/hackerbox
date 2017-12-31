var React = require('react');
import { Card } from './Card';

export class YourSavedStories extends React.Component {

  render() {
    return (
      <div className="card">
        <div style={{paddingLeft: '15px', paddingTop: '15px'}}><h3>Your Saved Stories</h3></div>
        <div className="card-body" style={{position: 'relative', height: '64vh', overflowY: 'scroll'}}>
          <div id="list-example" className="list-group"></div>
          <div dataSpy="scroll" dataTarget="#list-example" dataOffset="0" className="scrollspy-example">
            <Card />
            <Card />
          </div>
        </div>
      </div>
    );
  }

}
