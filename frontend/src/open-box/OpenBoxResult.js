import React from 'react';

import { Link } from 'react-router-dom';

class OpenBoxResult extends React.Component {
  render() {
    return (
      <div className={`open-box-result ${this.props.letter_opened}`}>
        <div className="open-box-result-name">
          {this.props.name}
        </div>
        <div className="open-box-result-link">
          <Link to={`/letter/${this.props.hash}`}>
            <button className="open-box-result-button">Open</button>
          </Link>
        </div>
      </div>
    )
  }
}

export default OpenBoxResult;
