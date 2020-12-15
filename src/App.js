import { Colors, Dialog, Classes, FocusStyleManager } from '@blueprintjs/core';

import Body from './components/Body';
import Footer from './components/Footer';
import HackerBoxNavbar from './components/Navbar';
import HackerBoxDrawer from './components/drawer/Drawer';

const Utils = require('./utils/AppUtils');
const React = require('react');

FocusStyleManager.onlyShowFocusOnTabs();

class App extends React.Component {
    constructor(props) {
        super(props);
        this.makeNewsApiCall = this.makeNewsApiCall.bind(this);
        this.state = Utils.initialState();
    }

    // called after the App component finishes mounting and we get the latest stories and available sources
    async componentDidMount() {
        this.makeNewsApiCall(this.state.source);
        try {
            const newState = await Utils.componentDidMount();
            this.setState(newState);
        } catch (err) {
            console.log(err);
        }
    }

    // makes the api call to get the latest stories for the specified source
    async makeNewsApiCall(source) {
        this.setState({ skeleton: 'bp3-skeleton' });
        try {
            const newState = await Utils.makeNewsApiCall(source, this.state.country);
            this.setState(newState);
        } catch (err) {
            console.log(err);
        }
    }

    // handles the opening of the saved stories
    async handleOpenSavedStories() {
        this.setState({ skeleton: 'bp3-skeleton', showSavedStories: true });
        try {
            const newState = await Utils.handleOpenSavedStories();
            this.setState(newState);
        } catch (err) {
            console.log(err);
        }
    };

    // handles saving an article
    handleSaveArticle = (title, description, url, imageUrl, source) => Utils.handleSaveArticle(title, description, url, imageUrl, source);
    // handles removing an article from saved ones
    handleDeleteArticle = (title, description, url, imageUrl, source) => Utils.handleDeleteArticle(title, description, url, imageUrl, source);
    // handles error while removing article
    handleRemoveStoryError = (title) => console.log("Error removing story:", title);
    // handle opening the help dialog
    handleOpen = () => this.setState({ isDialogOpen: true });
    // handle closing the help dialog
    handleClose = () => this.setState({ isDialogOpen: false });
    // handle opening the side drawer (dashboard)
    handleDrawerOpen = () => this.setState({ isDrawerOpen: true });
    // handle closing the side drawer (dashboard)
    handleDrawerClose = () => this.setState({ isDrawerOpen: false });
    // handle the switch to include article images
    handleIncludeImages = () => this.setState({ includeImages: !this.state.includeImages});
    // handle the selection of a news source
    handleCurrentlySelectedItem = item => this.setState({ currentlySelectedItem: item });
    // handle the lock to show/hide password
    handleLockClick = () => this.setState({ showPassword: !this.state.showPassword });
    // handle opening an article in a new tab
    handleOpenArticle = link => Utils.handleOpenArticle(link);
    // handle the log in button
    handleLogInClick = () => this.setState({ loggedIn: true, logInDiv: 'hide', logOutDiv: 'show-flex' });
    // handle the log out button
    handleLogOutClick = () => this.setState({ loggedIn: false, logInDiv: 'show-block', logOutDiv: 'hide' });
    // handle the changing of tabs between sign-in/sign-up
    handleChangeTab = tabId => this.setState({ selectedTab: tabId });

    render() {
        const {
            skeleton,
            articles,
            listOfSources,
            includeImages,
            currentlySelectedItem,
            theme,
            isDialogOpen,
            isDrawerOpen,
            showPassword,
            selectedTab,
            showSavedStories,
            savedStories,
            loggedIn,
            logInDiv,
            logOutDiv
        } = this.state;

        return (
            <div className={theme} style={{ background: Colors.DARK_GRAY3 }}>

                {/* The Navigation Bar */}
                <HackerBoxNavbar
                    handleOpen={this.handleOpen}
                    handleDrawerOpen={this.handleDrawerOpen}
                    makeNewsApiCall={this.makeNewsApiCall}
                    handleCurrentlySelectedItem={this.handleCurrentlySelectedItem}
                    handleOpenSavedStories={this.handleOpenSavedStories.bind(this)}
                />

                {/* The Main Area of the Application */}
                <Body
                    skeleton={skeleton}
                    articles={articles}
                    makeNewsApiCall={this.makeNewsApiCall}
                    listOfSources={listOfSources}
                    includeImages={includeImages}
                    handleOpenSavedStories={this.handleOpenSavedStories.bind(this)}
                    currentlySelectedItem={currentlySelectedItem}
                    handleIncludeImages={this.handleIncludeImages}
                    handleCurrentlySelectedItem={this.handleCurrentlySelectedItem}
                    handleOpenArticle={this.handleOpenArticle}
                    handleSaveArticle={this.handleSaveArticle}
                    handleDeleteArticle={this.handleDeleteArticle}
                    handleRemoveStoryError={this.handleRemoveStoryError}
                    showSavedStories={showSavedStories}
                    savedStories={savedStories}
                />

                {/* The Footer */}
                <Footer />

                {/* The Help/Welcome Dialog (Modal) */}
                <Dialog
                    isOpen={isDialogOpen}
                    className={theme}
                    onClose={this.handleClose}
                    title="Welcome to Hackerbox"
                >
                    <div className={Classes.DIALOG_BODY}>
                        {Utils.helpMessage()}
                    </div>
                </Dialog>

                {/* The Login/Signup Drawer (If Necessary) */}
                <HackerBoxDrawer
                    handleDrawerClose={this.handleDrawerClose}
                    handleLockClick={this.handleLockClick}
                    isDrawerOpen={isDrawerOpen}
                    showPassword={showPassword}
                    theme={theme}
                    selectedTab={selectedTab}
                    handleChangeTab={this.handleChangeTab}
                    handleLogInClick={this.handleLogInClick}
                    handleLogOutClick={this.handleLogOutClick}
                    loggedIn={loggedIn}
                    logInDiv={logInDiv}
                    logOutDiv={logOutDiv}
                />
            </div>
        );
    }
}

export default App;
