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
    return (
      <input
        type="text"
        className="create-box-input"
        onChange={this.handleChange}
      >
      </input>
    )
  }
}

export default CreateBoxInput;
