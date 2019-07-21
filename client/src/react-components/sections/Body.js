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
    handleCurrentlySelectedItem,
    handleOpenArticle,
    handleSaveArticle,
    showSavedStories,
    savedStories
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
        handleOpenArticle={handleOpenArticle}
        handleSaveArticle={handleSaveArticle}
        showSavedStories={showSavedStories}
        savedStories={savedStories}
      />
    </div>
  );
};

export default Body;
