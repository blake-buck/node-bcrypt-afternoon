import React, { Component } from 'react';
import axios from 'axios';
import './Container.css';
import Treasure from '../Treasure';

export default class Container extends Component {
  constructor() {
    super();
    this.state = {
      treasures: {},
    };
    this.addMyTreasure = this.addMyTreasure.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({ treasures: {} });
    }
  }

  getDragonTreasure() {
    // axios GET to /api/treasure/dragon here
	var {treasures} = this.state;
	axios.get('/api/treasure/dragon').then( (results) => {
		treasures = {...treasures, dragon:results.data};
		this.setState({treasures});
	}).catch(err => console.log(err));
  }

  getAllTreasure() {
    // axios GET to /api/treasure/all here
	var {treasures} = this.state;
	axios.get('/api/treasure/all').then( results => {
		this.setState({
			treasures:{
				...this.state.treasures,
				all: results.data
			}
		})
	}).catch(error => alert(error.response.request.response))
  }

  getMyTreasure() {
    // axios GET to /api/treasure/user here
	var {treasures} = this.state;
	axios.get('/api/treasure/user').then( (results) => {
		treasures = {...treasures, user:results.data};
		this.setState({treasures});
	}).catch(err => {
		alert(err.response.request.response);
		console.log(err)
	});
		
  }

  addMyTreasure(newMyTreasure) {
	  console.log(newMyTreasure);
    this.setState({
      treasures: {
        ...this.state.treasures,
        image_url: newMyTreasure,
      },
    });
  }

  render() {
    const { username } = this.props.user;
    const { dragon, user, all } = this.state.treasures;
    return (
      <div className="Container">
        {dragon ? (
          <div className="treasureBox loggedIn">
            <h1>Dragon's treasure</h1>
            <Treasure treasure={dragon} />
          </div>
        ) : (
          <div className="treasureBox">
            <button className="title" onClick={() => this.getDragonTreasure()}>
              See Dragon's <br /> Treasure
            </button>
            <p>This treasure trove does not require a user to be logged in for access</p>
          </div>
        )}
        {user && username ? (
          <div className="treasureBox loggedIn">
            <h1>
              {this.props.user.username}
              's treasure
            </h1>
            <Treasure treasure={user} addMyTreasure={this.addMyTreasure} />
          </div>
        ) : (
          <div className="treasureBox">
            <button className="title" onClick={() => this.getMyTreasure()} name="user">
              See My <br /> Treasure
            </button>
            <p>This treasure trove requires a user to be logged in for access</p>
          </div>
        )}
        {all && username ? (
          <div className="treasureBox loggedIn">
            <h1>All treasure</h1>
            <Treasure treasure={all} />
          </div>
        ) : (
          <div className="treasureBox">
            <button className="title" onClick={() => this.getAllTreasure()} name="all">
              See All <br /> Treasure
            </button>
            <p>This treasure trove requires a user to be a logged in as an admin user for access</p>
          </div>
        )}
      </div>
    );
  }
}
