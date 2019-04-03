import { Stories } from './stories/Stories';
import { MostRecentStories } from './stories/MostRecentStories';
import { SavedStories } from './stories/SavedStories';

var React = require('react');

var dragula = require('react-dragula');


export class Body extends React.Component {

  componentDidMount() {
    let topStories = document.getElementById('top-stories');
    let mostRecent = document.getElementById('most-recent');
    let savedStories = document.getElementById('saved-stories');
    dragula([topStories, savedStories]);
    dragula([mostRecent, savedStories]);
  }

  render() {
    return(
      <div>
        <div className="row" style={{height: '80vh'}}>
          <div className="col stories-cols" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
            <Stories title="Top Stories" icon="far fa-file-alt" id="top-stories" data={this.props.topStories} base={this.props.base} />
          </div>
          <div className="col stories-cols" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
            <Stories title="Most Recent" icon="fas fa-stopwatch" id="most-recent" data={this.props.mostRecent} base={this.props.base} />
          </div>
          <div className="col stories-cols" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
            <SavedStories title="Saved Stories" icon="far fa-save" id="saved-stories" data={this.props.topStories} base={this.props.base} />
          </div>
        </div>

      </div>
    );
  }

}
