import React, { Component } from 'react';
import axios from 'axios';

export default class AddTreasure extends Component {
  constructor() {
    super();
    this.state = {
      treasureURL: '',
    };
  }

  handleInput(e) {
    this.setState({ treasureURL: e.target.value });
  }

  addTreasure() {
    // post to /api/treasure/user here
	var {treasureURL} = this.state;
	axios.post('/api/treasure/user', {treasureURL}).then( (results) => {
		
		console.log(results.data[results.data.length-1]);
		this.props.addMyTreasure(results.data[results.data.length-1]);
		this.setState({treasureURL:""});
	}).catch(error => alert(error.response.request.response))
  }

  render() {
    return (
      <div className="addTreasure">
        <input
          type="text"
          placeholder="Add image URL"
          onChange={e => this.handleInput(e)}
          value={this.state.treasureURL}
        />
        <button onClick={() => this.addTreasure()}>Add</button>
      </div>
    );
  }
}
