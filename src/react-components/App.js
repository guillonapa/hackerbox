import { Body } from './sections/Body';
import { Footer } from './sections/Footer';
import { Colors, Dialog, Classes, Drawer } from '@blueprintjs/core';
import { HackerBoxNavbar } from './sections/HackerBoxNavbar';
import Emoji from 'a11y-react-emoji';

var React = require('react');
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('17eb61e8bd484e17b7ad33c4428ebfc4');

/*        
    THINGS TO DO
    ------------
  [*] Set the state at the root of the app: stories data.
  [*] Read the stories data (state) appropriately from cards.
  [*] Use a map to create all the Card components.
  [*] Set up the Suggest component correctly (including data sources).
  [*] Query News API after a new selection is made from Suggest.
  [ ] Reload page with Home button (same query must remain).
  [ ] Add help dialog to Help button.
  [ ] Add menu to menu button.
  [ ] Add a propper footer.
  [ ] Add database to application.
  [ ] Add users with username and password.
  [ ] Add options to each story card (open, save, dismiss, copy link, etc.).
  [ ] Add table for 'Saved Stories'.
  [ ] Add section, tray, or page to show saved stories.
  [ ] Add profile page with settings.
*/

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.makeNewsApiCall = this.makeNewsApiCall.bind(this);
    this.state = {
      skeleton: "bp3-skeleton",
      articles: Array(10).fill(
        {
          author: "___",
          title: "___",
          description: "___",
          url: "___",
          urlToImage: "gradient.png",
          source: {
            id: "___",
            name: "___"
          }
        }),
      source: "",
      country: "us",
      pageSize: 30,
      theme: "bp3-dark",
      listOfSources: [],
      isOpen: false,
      includeImages: true,
      currentlySelectedItem: null
    }
  }
    
  makeNewsApiCall(source) {
    this.setState({ skeleton: "bp3-skeleton" });
    // call the API and get stories for default
    var options;
    if (source === null || source === "") {
      options = { country: this.state.country, pageSize: this.state.pageSize };
    } else {
      options = { sources: [source], pageSize: this.state.pageSize }
    }
    newsapi.v2.topHeadlines(options).then(response => {
      console.log("newsapi.v2 response:", response);
      // for dramatic effect
      setTimeout(() => {
        this.setState({
          source: source,
          articles: response.articles,
          skeleton: ""
        });
      }, 1000);
    });
  }

  componentDidMount() {
    this.makeNewsApiCall(this.state.source);
    newsapi.v2.sources({
      language: "en"
    }).then(response => {
      this.setState({
        listOfSources: response.sources
      })
    });
  }

  render() {
    const { skeleton, articles, listOfSources, includeImages, currentlySelectedItem } = this.state;
    return (
      <div className={this.state.theme} style={{background: Colors.DARK_GRAY3}}>
        <HackerBoxNavbar handleOpen={this.handleOpen} 
                          makeNewsApiCall={this.makeNewsApiCall}
                          handleCurrentlySelectedItem={this.handleCurrentlySelectedItem} />
        <Body skeleton={skeleton} 
              articles={articles} 
              makeNewsApiCall={this.makeNewsApiCall} 
              listOfSources={listOfSources} 
              includeImages={includeImages} 
              currentlySelectedItem={currentlySelectedItem}
              handleIncludeImages={this.handleIncludeImages}
              handleCurrentlySelectedItem={this.handleCurrentlySelectedItem} />
        <Footer />
        <Dialog 
          isOpen={this.state.isOpen} 
          className={this.state.theme} 
          onClose={this.handleClose}
          title="Welcome to HackerBox">
          <div className={Classes.DIALOG_BODY}>
            <p>Hacker Box is a platform where all your hacker reading comes to a place. There's a ton of amazing blogs and sites, but it's hard to keep up with all the cool content. Hacker Box is a place where you can find and read awesome material, or save it for later reads!</p>
            <p>We recommend checking out Hacker Box with your first cup of coffee in the morning. Cheers! <Emoji symbol="☕" /></p>
          </div>
        </Dialog>
        <Drawer className={this.state.theme} isOpen={false} />
      </div>
    );
  }

  handleOpen = () => this.setState({ isOpen: true });
  handleClose = () => this.setState({ isOpen: false });
  handleIncludeImages = () => this.setState({ includeImages: !this.state.includeImages });
  handleCurrentlySelectedItem = (item) => this.setState({ currentlySelectedItem: item });
}