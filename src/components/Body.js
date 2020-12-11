import Search from './main/Search';
import Results from './main/Results';

const React = require('react');

const Body = props => {
    const {
        skeleton,
        articles,
        makeNewsApiCall,
        listOfSources,
        includeImages,
        handleOpenSavedStories,
        currentlySelectedItem,
        handleIncludeImages,
        handleCurrentlySelectedItem,
        handleOpenArticle,
        handleSaveArticle,
        handleDeleteArticle,
        handleRemoveStoryError,
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
                handleOpenSavedStories={handleOpenSavedStories}
                handleOpenArticle={handleOpenArticle}
                handleSaveArticle={handleSaveArticle}
                handleDeleteArticle={handleDeleteArticle}
                handleRemoveStoryError={handleRemoveStoryError}
                showSavedStories={showSavedStories}
                savedStories={savedStories}
            />
        </div>
    );
};

export default Body;
