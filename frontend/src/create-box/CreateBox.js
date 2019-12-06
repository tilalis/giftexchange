import React from 'react';

import CreateBoxInput from './CreateBoxInput';

import './CreateBox.css';

class CreateBox extends React.Component {
  constructor(props) {
    super(props);

    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);

    this.state = {
      name: '',
      values: ['']
    }
  }

  submit() {
    // Some Ajax Here
  }

  handleNameChange(value, _) {
    this.setState({
      name: value
    })
  }

  handleChange(value, index) {
    let values = this.state.values;

    values[index] = value;
    if (index === values.length - 1 && value !== '') {
      this.setState({
        values: values.concat('')
      })
    } else {
      this.setState({
        values: values
      })
    }
  }

  render() {
    return (
      <div id="create-box">
        <div id="create-box-greeting">
          <h2>Hi! You can create new box here.</h2>
        </div>

        <div id="create-box-name">
          <label>
          Box Name
          <CreateBoxInput
            index={-1}
            value={this.state.value}
            onChange={this.handleNameChange}
          />

          </label>
        </div>

        <div id="create-box-participants">
          <label>
          Participant Names
          {
            this.state.values.map((value, index) => {
              return <CreateBoxInput
                key={index}
                index={index}
                value={value}
                onChange={this.handleChange}
                />
              })
            }
            </label>
        </div>
        <div id="create-box-submit">
          <input
            id="create-box-submit-button"
            type="button"
            value="Submit"
            onClick={this.submut}
          >
          </input>
        </div>
      </div>
    )
  }
}

export default CreateBox;
