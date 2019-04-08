import { Search } from './Search';
import { Results } from './Results';

var React = require('react');

export class Body extends React.Component {
  render() {
    const { skeleton, articles } = this.props;
    return(
      <div style={{padding: "30px"}}>
        <Search makeNewsApiCall={this.props.makeNewsApiCall} listOfSources={this.props.listOfSources} />
        <Results skeleton={skeleton} articles={articles} />
      </div>
    );
  }

}
