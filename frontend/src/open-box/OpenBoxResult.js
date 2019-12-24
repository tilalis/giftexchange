import React from 'react';

import { Link } from 'react-router-dom';

class OpenBoxResultCopyButton extends React.Component {
  constructor(props) {
    super(props);

    this.click = this.click.bind(this)
    this.state = {
      text: "Copy Link",
      copied: false
    }
  }

  click() {
    let previousText = this.state.text;

    var dummy = document.createElement("input");

    document.body.appendChild(dummy);
    dummy.setAttribute("id", "dummy_id");
    dummy.value = this.props.value;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);

    this.setState({
      text: "Copied!",
      copied: true
    })

    setTimeout(() => {
      this.setState({
        text: previousText,
        copied: false
      })
    }, 1000)
  }

  render() {
    return (
      <button className={`open-box-result-copy ${this.state.copied}`} onClick={this.click}>
        {this.state.text}
      </button>
    )
  }
}

class OpenBoxResult extends React.Component {
  render() {
    return (
      <div className={`open-box-result ${this.props.letter_opened}`}>
        <div className="open-box-result-name">
          {this.props.name}
        </div>
        <div className="open-box-result-link">
          <OpenBoxResultCopyButton
            value={
              `${window.location.host}/letter/${this.props.hash}`
            }
          />
          <Link to={`/letter/${this.props.hash}`}>
            <button className="open-box-result-open">Open</button>
          </Link>
        </div>
      </div>
    )
  }
}

export default OpenBoxResult;
