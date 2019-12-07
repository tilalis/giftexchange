import React from 'react';

class CreateBoxErrorMessage extends React.Component {
  render() {
    return (
      <div
        id="create-box-error-message"
        className={this.props.message? "": "empty"}
      >
      {this.props.message}
      </div>
    )
  }
}

export default CreateBoxErrorMessage;
