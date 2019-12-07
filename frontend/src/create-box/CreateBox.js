import React from 'react';

import API from '../api';

import CreateBoxInput from './CreateBoxInput';
import CreateBoxErrorMessage from './CreateBoxErrorMessage';

import './CreateBox.css';

class CreateBox extends React.Component {
  constructor(props) {
    super(props);

    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);

    this.state = {
      name: {
        value: '',
        state: CreateBoxInput.DEFAULT
      },
      values: [''],
      errorMessage: ''
    }
  }

  submit() {
      let box = {
        name: this.state.name.value,
        savtas: this.state.values.slice(0, -1)
      };

      API.createBox(box).then((json) => {
        console.log(json);

        this.setState({
          errorMessage: ''
        })

      }).catch(e => {
        if (e.type === "CreateBoxMissingName") {
          this.setState({
            name: {
              ...this.state.name,
              state: CreateBoxInput.ERROR
            }
          })
        }

        if (e instanceof API.APIError) {
          this.setState({
            errorMessage: e.message
          })
        } else {
          this.setState({
            errorMessage: "Error connecting to server"
          })
        }

      })
  }

  handleNameChange(value, _) {
    let state = value !== ''?  CreateBoxInput.DEFAULT : CreateBoxInput.EMPTY;

    this.setState({
      name: {
        value: value,
        state: state
      }
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

        <CreateBoxErrorMessage message={this.state.errorMessage}/>

        <div id="create-box-name" className="create-box-section">
          <label>Box Name</label>
          <CreateBoxInput
            index={-1}
            value={this.state.name.value}
            state={this.state.name.state}
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
                state={value === ''? CreateBoxInput.EMPTY: CreateBoxInput.DEFAULT}
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
