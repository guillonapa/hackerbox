import { Body } from './sections/Body';
import { Footer } from './sections/Footer';
import { Colors } from '@blueprintjs/core';
import { HackerBoxNavbar } from './sections/HackerBoxNavbar';

var React = require('react');
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('17eb61e8bd484e17b7ad33c4428ebfc4');

/*        
    THINGS TO DO
    ------------
  [*] Set the state at the root of the app: stories data.
  [*] Read the stories data (state) appropriately from cards.
  [*] Use a map to create all the Card components.
  [ ] Set up the Suggest component correctly (including data sources).
  [ ] Query News API after a new selection is made from Suggest.
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

  state = {
    skeleton: "bp3-skeleton",
    articles: Array(10).fill(
      {
        author: "___",
        title: "___",
        description: "___",
        url: "___",
        source: {
          id: "___",
          name: "___"
        }
      }),
    source: "the-verge",
    theme: "bp3-dark"
  }

  componentDidMount() {
    // call the API and get stories for default
    newsapi.v2.topHeadlines({
      sources: this.state.source
    }).then(response => {
      console.log("newsapi.v2 response:", response);
      // for dramatic effect
      setTimeout(() => {
        this.setState({
          articles: response.articles,
          skeleton: ""
        });
      }, 1000);
    });
  }

  render() {
    const { skeleton, articles } = this.state;
    return (
      <div className={this.state.theme} style={{background: Colors.DARK_GRAY3}}>
        <HackerBoxNavbar />
        <Body skeleton={skeleton} articles={articles} />
        <Footer />
      </div>
    );
  }

}