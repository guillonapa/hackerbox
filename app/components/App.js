var React = require('react');
import { Header } from './Header';
import { Body } from './Body';

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
    const newColorIndex = (this.state.colorIndex + 1)%numColors;
    const newColor = colors[newColorIndex];
    this.setState({ color: newColor, colorIndex: newColorIndex });
  }

  render() {
    return (
      <div style={{background: this.state.color, padding: '30px', height: '100%'}}>
        <Header />
        <Body onClick={this.handleClick} topStories={this.props.topStories} mostRecent={this.props.mostRecent} base={this.props.base} />
      </div>
    );
  }

}
