import React from 'react';

import API from '../api';

import './OpenBox.css';
import OpenBoxResult from './OpenBoxResult';

class OpenBox extends React.Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);

    this.state = {
      search: '',
      values: []
    }
  }

  componentDidMount() {
    API.getBox(this.props.match.params.box)
    .then((box) => {
      console.log(box.savtas);

      this.setState({
        values: box.savtas
      })
    })
    .catch((e) => {
      console.log(e.message);
    })
  }

  handleInputChange(e) {
    this.setState({
      search: e.target.value
    })
  }

  render() {
    return (
      <div id="open-box">
        <div id="open-box-greeting">
          <h2>Type your name here...</h2>
        </div>

        <div id="open-box-search">
          <input
            type="text"
            className="open-box-input"
            value={this.state.search}
            onChange={this.handleInputChange}
            >
          </input>
        </div>

        <div id="open-box-results">
          {
            this.state.values
            .filter(item => item.name.startsWith(this.state.search))
            .map(item => <OpenBoxResult
              key={item.name}
              name={item.name}
              hash={item.hash}
              letter_opened={item.letter_opened}
            />)
          }
        </div>
      </div>
    )
  }
}

export default OpenBox;
