/* eslint-disable react/jsx-boolean-value */
import {
    Card,
    Elevation,
    Colors,
    Button,
    Popover,
    Position,
    Menu,
    MenuItem,
    MenuDivider
} from '@blueprintjs/core';
// import { handleOpenSavedStories } from '../../utils/AppUtils';

const React = require('react');

const Results = props => {
    const {
        skeleton,
        articles,
        includeImages,
        handleOpenSavedStories,
        handleOpenArticle,
        handleSaveArticle,
        handleDeleteArticle,
        handleRemoveStoryError,
        showSavedStories,
        savedStories
    } = props;

    const deleteArticle = (name, description, link, imageUrl, source) => {
        return async () => {
            if (await handleDeleteArticle(name, description, link, imageUrl, source)()) {
                handleOpenSavedStories();
            } else {
                handleRemoveStoryError(name);
            }
        }
    };

    const menu = (name, description, link, imageUrl, source) => (
        <Menu>
            <MenuItem icon="link" text="Open..." onClick={handleOpenArticle(link)} />
            {!showSavedStories ?
                <div>
                    <MenuDivider />
                    <MenuItem
                        icon="floppy-disk"
                        text="Save"
                        onClick={handleSaveArticle(name, description, link, imageUrl, source)}
                    />    
                </div>
             : ""}
            {showSavedStories ? <MenuItem icon="trash" text="Remove" onClick={deleteArticle(name, description, link, imageUrl, source)} /> : ""}
        </Menu>
    );

    // check if we show the saved stories
    if (showSavedStories) {
        return (
            <Card interactive={false} elevation={Elevation.TWO}>
                <h1>Saved Stories</h1>
                {/* fields coming back from the db are all lowercase... hence 'imageurl' */}
                {savedStories.map((story, i) => (
                    <Card style={{ marginBottom: '15px' }} interactive={false} elevation={Elevation.TWO} key={1000 * Math.random()}>
                        {' '}
                        <div className="card-body">
                            <div style={{ marginRight: '10px' }} className={includeImages ? skeleton : 'hide'}>
                                <img className="card-image" alt="article title" src={story.imageurl === null ? 'assets/images/gradient.png' : story.imageurl}/>
                            </div>
                            <div style={{ width: '100%' }}>
                                <div className="card-header">
                                    <h3 className={skeleton}>
                                        <a href={story.url} target="_blank" rel="noopener noreferrer"> {story.title}</a>
                                    </h3>
                                    <Popover minimal={true} position={Position.LEFT_TOP} enforceFocus={false}>
                                        <Button style={{ margin: '5px' }} className="bp3-minimal" icon="more"/>
                                        {menu(story.title, story.description, story.url, story.imageurl, story.source)}
                                    </Popover>
                                </div>
                                <p className={skeleton} style={{ marginRight: '40px' }}>
                                    {story.description}
                                </p>
                                <p className={skeleton} style={{ marginRight: '40px' }}>
                                    <i style={{ color: Colors.GRAY3 }}>Source: {story.source}</i>
                                </p>
                            </div>
                        </div>
                    </Card>
                ))}
            </Card>
        );
    }

    // we show the results of a query
    return (
        <Card interactive={false} elevation={Elevation.TWO}>
            <h1>Results</h1>
            {articles.map((article, i) => (
                <Card style={{ marginBottom: '15px' }} interactive={false} elevation={Elevation.TWO} key={1000 * Math.random()}>
                    {' '}
                    {/* what should the key be? */}
                    <div className="card-body">
                        <div style={{ marginRight: '10px' }} className={includeImages ? skeleton : 'hide'}>
                            <img className="card-image" alt="article title" src={article.urlToImage === null ? 'assets/images/gradient.png' : article.urlToImage}/>
                        </div>
                        <div style={{ width: '100%' }}>
                            <div className="card-header">
                                <h3 className={skeleton}>
                                    <a href={article.url} target="_blank" rel="noopener noreferrer">{article.title}</a>
                                </h3>
                                <Popover minimal={true} position={Position.LEFT_TOP} enforceFocus={false}>
                                    <Button style={{ margin: '5px' }} className="bp3-minimal" icon="more"/>
                                    {menu(article.title, article.description, article.url, article.urlToImage, article.source.name)}
                                </Popover>
                            </div>
                            <p className={skeleton} style={{ marginRight: '40px' }}>
                                {article.description}
                            </p>
                            <p className={skeleton} style={{ marginRight: '40px' }}>
                                <i style={{ color: Colors.GRAY3 }}>Source: {article.source.name}</i>
                            </p>
                        </div>
                    </div>
                </Card>
            ))}
        </Card>
    );
};

export default Results;
