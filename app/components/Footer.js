var React = require('react');

export class Footer extends React.Component {

  render() {
    return (
      <div className="row" style={{paddingTop: '15px'}}>
        <div className="col">
          <button onClick={this.props.onClick} type="button" className="btn btn-warning"><i className="fas fa-paint-brush"></i> Colorize! &nbsp;</button>
        </div>
        <div className="col-md-auto">
          <h6>&copy; Guillermo Narvaez (2017-2018)</h6>
        </div>
      </div>
    );
  }

}
