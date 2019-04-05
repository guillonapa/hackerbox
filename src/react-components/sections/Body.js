import { Search } from './Search';
import { Results } from './Results';

var React = require('react');

export class Body extends React.Component {
  render() {
    const { skeleton, articles } = this.props;
    return(
      <div style={{padding: "30px"}}>
        <Search />
        <Results skeleton={skeleton} articles={articles} />
      </div>
    );
  }

}
