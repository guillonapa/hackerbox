import Search from './Search';
import Results from './Results';

const React = require('react');

const Body = props => {
  const {
    skeleton,
    articles,
    makeNewsApiCall,
    listOfSources,
    includeImages,
    currentlySelectedItem,
    handleIncludeImages,
    handleCurrentlySelectedItem
  } = props;
  return (
    <div style={{ padding: '30px' }}>
      <Search
        makeNewsApiCall={makeNewsApiCall}
        listOfSources={listOfSources}
        includeImages={includeImages}
        currentlySelectedItem={currentlySelectedItem}
        handleIncludeImages={handleIncludeImages}
        handleCurrentlySelectedItem={handleCurrentlySelectedItem}
      />
      <Results
        skeleton={skeleton}
        articles={articles}
        includeImages={includeImages}
      />
    </div>
  );
};

export default Body;
