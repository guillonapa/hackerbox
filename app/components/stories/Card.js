var React = require('react');

export class Card extends React.Component {

  render() {
    return (
      <div className="card bg-light mb-3 article-card">
        <div className="card-body">
          <h5 className="card-title">{this.props.title}</h5>
          <h6 className="card-subtitle mb-2">{this.props.subtitle}</h6>
          <p className="card-text">{this.props.description}</p>
        </div>
      </div>
    );
  }

}
