import { Search } from './Search';
import { Results } from './Results';

var React = require('react');

export class Body extends React.Component {
  render() {
    const { skeleton, articles } = this.props;
    return(
      <div style={{padding: "30px"}}>
        <Search makeNewsApiCall={this.props.makeNewsApiCall} 
                listOfSources={this.props.listOfSources} 
                includeImages={this.props.includeImages} 
                currentlySelectedItem={this.props.currentlySelectedItem}
                handleIncludeImages={this.props.handleIncludeImages}
                handleCurrentlySelectedItem={this.props.handleCurrentlySelectedItem} />
        <Results skeleton={skeleton} articles={articles} includeImages={this.props.includeImages} />
      </div>
    );
  }

}
