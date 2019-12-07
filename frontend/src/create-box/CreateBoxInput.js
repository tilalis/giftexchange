import React from 'react';

class CreateBoxInput extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    if (this.props.onChange !== undefined) {
      this.props.onChange(e.target.value, this.props.index)
    }
  }

  render() {
    let className = "create-box-input"

    switch (this.props.state) {
      case CreateBoxInput.EMPTY:
        className = `${className} empty`;
        break;
      case CreateBoxInput.ERROR:
        className = `${className} error`;
        break;
      default:
    }
    if (this.props.isError === true) {
      className = `${className} error`
    }

    return (
      <input
        type="text"
        className={className}
        onChange={this.handleChange}
      >
      </input>
    )
  }
}

CreateBoxInput.DEFAULT = -1;
CreateBoxInput.EMPTY = 0;
CreateBoxInput.ERROR = 1;

export default CreateBoxInput;
