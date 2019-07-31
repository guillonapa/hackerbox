import { Colors, Dialog, Classes } from '@blueprintjs/core';
import Emoji from 'a11y-react-emoji';
import axios from 'axios';

import Body from './components/Body';
import Footer from './components/Footer';
import HackerBoxNavbar from './components/Navbar';
import HackerBoxDrawer from './components/drawer/Drawer';

const React = require('react');
// const NewsAPI = require('newsapi');

const pageSize = 30;
// const newsapi = new NewsAPI(newsapikey);
const SERVER_URL = 'http://localhost:3001';

/*        
    THINGS TO DO
    ------------
  [*] Set the state at the root of the app: stories data.
  [*] Read the stories data (state) appropriately from cards.
  [*] Use a map to create all the Card components.
  [*] Set up the Suggest component correctly (including data sources).
  [*] Query News API after a new selection is made from Suggest.
  [*] Reload page with Home button.
  [*] Add help dialog to Help button.
  [*] Add menu to menu button.
  [*] Add a propper footer.
  [ ] Add database to application.
  [ ] Add users with username and password.
  [*] Add options to each story card (open, save, dismiss, copy link, etc.).
  [ ] Add table for 'Saved Stories'.
  [ ] Add section, tray, or page to show saved stories.
  [ ] Add profile page with settings.
*/

class App extends React.Component {
  constructor(props) {
    super(props);
    this.makeNewsApiCall = this.makeNewsApiCall.bind(this);
    this.state = {
      skeleton: 'bp3-skeleton',
      articles: Array(10).fill({
        author: '___',
        title: '___',
        description: '___',
        url: '___',
        urlToImage: 'assets/images/gradient.png',
        source: {
          id: '___',
          name: '___'
        }
      }),
      source: '',
      country: 'us',
      // pageSize: 30,
      theme: 'bp3-dark',
      listOfSources: [],
      isDialogOpen: false,
      isDrawerOpen: false,
      includeImages: true,
      currentlySelectedItem: null,
      showPassword: false,
      selectedTab: 'log-in-tab',
      showSavedStories: false,
      savedStories: []
    };
  }

  componentDidMount() {
    const { source } = this.state;
    this.makeNewsApiCall(source);
    axios.get(`${SERVER_URL}/sources`).then(response => {
      if (response.data.success) {
        this.setState({
          listOfSources: response.data.sources
        });
      }
    });
    // newsapi.v2.sources({
    //   language: "en"
    // }).then(response => {
    //   this.setState({
    //     listOfSources: response.sources
    //   })
    // });
  }

  // handle opening the help dialog
  handleOpen = () => this.setState({ isDialogOpen: true });

  // handle closing the help dialog
  handleClose = () => this.setState({ isDialogOpen: false });

  // handle opening the side drawer (dashboard)
  handleDrawerOpen = () => this.setState({ isDrawerOpen: true });

  // handle closing the side drawer (dashboard)
  handleDrawerClose = () => this.setState({ isDrawerOpen: false });

  // handle the switch to include article images
  handleIncludeImages = () => {
    const { includeImages } = this.state;
    this.setState({ includeImages: !includeImages });
  };

  // handle the selection of a news source
  handleCurrentlySelectedItem = item =>
    this.setState({ currentlySelectedItem: item });

  // handle the lock to show/hide password
  handleLockClick = () => {
    const { showPassword } = this.state;
    this.setState({ showPassword: !showPassword });
  };

  handleOpenArticle = link => {
    return () => {
      window.open(link, '_blank');
    };
  };

  handleSaveArticle = (title, description, url, imageUrl, source) => {
    return () => {
      axios.post(`${SERVER_URL}/save`, {
        user: 'guillonapa',
        title,
        description,
        url,
        imageUrl,
        source
      });
    };
  };

  // handle the log in button
  handleLogInClick = () => {
    console.log('Log in button clicked...');
  };

  // handle the changing of tabs between sign-in/sign-up
  handleChangeTab = tabId => this.setState({ selectedTab: tabId });

  handleOpenSavedStories = () => {
    this.setState({ skeleton: 'bp3-skeleton', showSavedStories: true });
    axios
      .get(`${SERVER_URL}/saved-stories`, { params: { user: 'guillonapa' } })
      .then(res => {
        if (res.data.success) {
          this.setState({ savedStories: res.data.data, skeleton: '' });
        }
      });
  };

  makeNewsApiCall(source) {
    const { country } = this.state;
    this.setState({ skeleton: 'bp3-skeleton' });
    axios
      .get(`${SERVER_URL}/stories`, {
        params: {
          source,
          country,
          pageSize
        }
      })
      .then(response => {
        if (response.data.success) {
          this.setState({
            source,
            articles: response.data.stories,
            skeleton: '',
            showSavedStories: false
          });
        }
      });

    // let options;
    // // call the API and get stories for default
    // if (source === null || source === "") {
    //   options = { country, pageSize };
    // } else {
    //   options = { sources: [source], pageSize }
    // }
    // newsapi.v2.topHeadlines(options).then(response => {
    //   // for dramatic effect
    //   setTimeout(() => {
    //     this.setState({
    //       source,
    //       articles: response.articles,
    //       skeleton: ""
    //     });
    //   }, 1000);
    // });
  }

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
      savedStories
    } = this.state;
    return (
      <div className={theme} style={{ background: Colors.DARK_GRAY3 }}>
        <HackerBoxNavbar
          handleOpen={this.handleOpen}
          handleDrawerOpen={this.handleDrawerOpen}
          makeNewsApiCall={this.makeNewsApiCall}
          handleCurrentlySelectedItem={this.handleCurrentlySelectedItem}
          handleOpenSavedStories={this.handleOpenSavedStories}
        />
        <Body
          skeleton={skeleton}
          articles={articles}
          makeNewsApiCall={this.makeNewsApiCall}
          listOfSources={listOfSources}
          includeImages={includeImages}
          currentlySelectedItem={currentlySelectedItem}
          handleIncludeImages={this.handleIncludeImages}
          handleCurrentlySelectedItem={this.handleCurrentlySelectedItem}
          handleOpenArticle={this.handleOpenArticle}
          handleSaveArticle={this.handleSaveArticle}
          showSavedStories={showSavedStories}
          savedStories={savedStories}
        />
        <Footer />
        <Dialog
          isOpen={isDialogOpen}
          className={theme}
          onClose={this.handleClose}
          title="Welcome to HackerBox"
        >
          <div className={Classes.DIALOG_BODY}>
            <p>
              Hacker Box is a platform where all your hacker reading comes to a
              place. There&apos;s a ton of amazing blogs and sites, but
              it&apos;s hard to keep up with all the cool content. Hacker Box is
              a place where you can find and read awesome material, or save it
              for later reads!
            </p>
            <p>
              We recommend checking out Hacker Box with your first cup of coffee
              in the morning. Cheers! <Emoji symbol="☕" />
            </p>
          </div>
        </Dialog>
        <HackerBoxDrawer
          handleDrawerClose={this.handleDrawerClose}
          handleLockClick={this.handleLockClick}
          isDrawerOpen={isDrawerOpen}
          showPassword={showPassword}
          theme={theme}
          selectedTab={selectedTab}
          handleChangeTab={this.handleChangeTab}
          handleLogInClick={this.handleLogInClick}
        />
      </div>
    );
  }
}

export default App;
