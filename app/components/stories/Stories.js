var React = require('react');
import { Card } from './Card'

const storiesColor = '#E3E3E3';
var cards = null;

export class Stories extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="card">
        <div style={{paddingLeft: '20px', paddingTop: '15px', paddingBottom: '15px', background: storiesColor}}><h3><i className={this.props.icon}></i>&nbsp;&nbsp; {this.props.title}</h3></div>
        <div className="card-body" style={{position: 'relative', height: '64vh', overflowY: 'scroll', background: storiesColor}}>
          <div id="list-example" className="list-group"></div>
          <div id={this.props.id} dataSpy="scroll" dataTarget="#list-example" dataOffset="0" className="scrollspy-example" style={{minHeight: '60vh', background: storiesColor}}>
          <Card title="" subtitle="" description="" id={this.props.data[0]} base={this.props.base} />
          <Card title="" subtitle="" description="" id={this.props.data[1]} base={this.props.base} />
          <Card title="" subtitle="" description="" id={this.props.data[2]} base={this.props.base} />
          <Card title="" subtitle="" description="" id={this.props.data[3]} base={this.props.base} />
          <Card title="" subtitle="" description="" id={this.props.data[4]} base={this.props.base} />
          <Card title="" subtitle="" description="" id={this.props.data[5]} base={this.props.base} />
          <Card title="" subtitle="" description="" id={this.props.data[6]} base={this.props.base} />
          <Card title="" subtitle="" description="" id={this.props.data[7]} base={this.props.base} />
          <Card title="" subtitle="" description="" id={this.props.data[8]} base={this.props.base} />
          <Card title="" subtitle="" description="" id={this.props.data[9]} base={this.props.base} /></div>
        </div>
      </div>
    );
  }
}
