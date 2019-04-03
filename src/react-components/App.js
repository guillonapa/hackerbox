import { Body } from './sections/Body';
import { Footer } from './sections/Footer';

var React = require('react');

const colors = ['#61BFAD', '#FF8B8B', '#F9F7E8', '#B7E3E4'];
const numColors = 4;

export class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      color: colors[0],
      colorIndex: 0
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    let newColorIndex = (this.state.colorIndex + 1)%numColors;
    let newColor = colors[newColorIndex];
    this.setState({ color: newColor, colorIndex: newColorIndex });
  }

  render() {
    return (
      <div style={{ paddingLeft: '30px', paddingRight: '30px', paddingTop: '0px', height: '100vh' }}>
        <Body topStories={this.props.topStories} mostRecent={this.props.mostRecent} base={this.props.base} />
        <Footer />
      </div>
    );
  }

}

// <div style={{background: 'linear-gradient(to bottom right, #05545B, ' + this.state.color + ')' , padding: '30px', height: '105vh' }}>
//
//   <Body topStories={this.props.topStories} mostRecent={this.props.mostRecent} base={this.props.base} />
//   <Footer />
// </div>
