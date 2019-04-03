var React = require('react');

function getStory(id, base) {
  base.fetch('v0/item/'+id, {
    context: this,
    asArray: false,
    then(data){
      console.log(data);
      updateTitle(id, data.title, data.url);
    }
  });
}

function updateTitle(id, title, url) {
  document.getElementById(id).innerHTML = title;
  document.getElementById('link-'+id).href = url;

  let temp = url;
  if(temp == null) {
    document.getElementById('site-'+id).innerHTML = 'No url found...';
  } else {
    document.getElementById('site-'+id).innerHTML = temp.split('/')[2].replace('www.', '');
  }
}


export class Card extends React.Component {

  constructor(props) {
    super(props);
    getStory(this.props.id, this.props.base);
  }

  render() {
    return (
      <div className="card bg-light mb-3 article-card">
        <div className="card-body" style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}>
          <h5 className="card-title" id={this.props.id} >{this.props.id}</h5>
          <p className="card-subtitle mb-2" id={'site-'+this.props.id}>{this.props.subtitle}</p>
          <p className="card-text"><a href="https://www.google.com/" id={'link-'+this.props.id} target="_blank" rel="noopener noreferrer">Read article</a></p>
        </div>
      </div>
    );
  }

}
