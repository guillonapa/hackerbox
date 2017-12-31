var React = require('react');
import { Footer } from './Footer';
import { Stories } from './stories/Stories';
import { MostRecentStories } from './stories/MostRecentStories';
import { YourSavedStories } from './stories/YourSavedStories';

var dragula = require('react-dragula');


export class Body extends React.Component {

  componentDidMount() {
    let topStories = document.getElementById('top-stories');
    let mostRecent = document.getElementById('most-recent');
    let savedStories = document.getElementById('saved-stories');
    dragula([topStories, mostRecent, savedStories]);
  }

  render() {
    return(
      <div>
        <div className="row" style={{height: '80vh'}}>
          <div className="col stories-cols" style={{paddingLeft: '0px'}}>
            <Stories title="Top Stories" icon="far fa-file-alt" id="top-stories" />
          </div>
          <div className="col stories-cols">
            <Stories title="Most Recent" icon="fas fa-stopwatch" id="most-recent" />
          </div>
          <div className="col stories-cols" style={{paddingRight: '0px'}}>
            <Stories title="Saved Stories" icon="far fa-save" id="saved-stories" />
          </div>
        </div>
        <Footer onClick={this.props.onClick} />
      </div>
    );
  }

}
