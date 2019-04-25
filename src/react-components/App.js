/* global Request fetch */

import { Colors, Dialog, Classes } from '@blueprintjs/core';
import Emoji from 'a11y-react-emoji';

import Body from './sections/Body';
import Footer from './sections/Footer';
import HackerBoxNavbar from './sections/HackerBoxNavbar';
import HackerBoxDrawer from './sections/drawer/HackerBoxDrawer';

const React = require('react');
// const NewsAPI = require('newsapi');

const newsapikey =
  process.env.NEWS_API_KEY === undefined ? 'xxx' : process.env.NEWS_API_KEY;
const pageSize = 30;
// const newsapi = new NewsAPI(newsapikey);

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
      selectedTab: 'log-in-tab'
    };
  }

  componentDidMount() {
    const { source } = this.state;
    this.makeNewsApiCall(source);
    const url = `https://newsapi.org/v2/sources?language=en&apiKey=${newsapikey}`;
    const req = new Request(url);
    fetch(req).then(response => {
      response.json().then(obj => {
        this.setState({
          listOfSources: obj.sources
        });
      });
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

  // handle the changing of tabs between sign-in/sign-up
  handleChangeTab = tabId => this.setState({ selectedTab: tabId });

  makeNewsApiCall(source) {
    const { country } = this.state;
    this.setState({ skeleton: 'bp3-skeleton' });

    let url;
    if (source === null || source === '') {
      url = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${newsapikey}&pageSize=${pageSize}`;
    } else {
      url = `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${newsapikey}&pageSize=${pageSize}`;
    }
    const req = new Request(url);
    fetch(req).then(response => {
      // console.log(response.json());
      setTimeout(() => {
        response.json().then(obj => {
          this.setState({
            source,
            // articles: response.json().articles,
            articles: obj.articles,
            skeleton: ''
          });
        });
      }, 1000);
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
      selectedTab
    } = this.state;
    return (
      <div className={theme} style={{ background: Colors.DARK_GRAY3 }}>
        <HackerBoxNavbar
          handleOpen={this.handleOpen}
          handleDrawerOpen={this.handleDrawerOpen}
          makeNewsApiCall={this.makeNewsApiCall}
          handleCurrentlySelectedItem={this.handleCurrentlySelectedItem}
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
        />
      </div>
    );
  }
}

export default App;
