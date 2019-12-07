import React from 'react';

import API from '../api';
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
      let box = {
        name: this.state.name,
        savtas: this.state.values.slice(0, -1)
      };

      API.createBox(box).then((json) => {
        console.log(json);
      }).catch(e => {
        alert(e.message)
      })
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
        <div id="create-box-greeting" className="create-box-section">
          <h2>Hi! You can create new box here.</h2>
        </div>

        <div id="create-box-name" className="create-box-section">
          <label>Box Name</label>
          <CreateBoxInput
            index={-1}
            value={this.state.value}
            onChange={this.handleNameChange}
          />
        </div>

        <div id="create-box-participants" className="create-box-section">
          <label>Participant Names</label>

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
        </div>
        <div id="create-box-submit">
          <input
            id="create-box-submit-button"
            type="button"
            value="Create"
            onClick={this.submit}
          >
          </input>
        </div>
      </div>
    )
  }
}

export default CreateBox;
