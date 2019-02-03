import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: '',
      from: '',
	via:'',
	to:'',
      comments: '',
      seats: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('boards').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const board = doc.data();
        this.setState({
          key: doc.id,
          from: board.from,
	  via: board.via,
	to: board.to,
          comments: board.comments,
          seats: board.seats
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({board:state});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { from, via, to, comments, seats } = this.state;

    const updateRef = firebase.firestore().collection('boards').doc(this.state.key);
    updateRef.set({
      from,
	via,
	to,
      comments,
      seats
    }).then((docRef) => {
      this.setState({
        key: '',
        from: '',
	via:'',
	to:'',
        comments: '',
        seats: ''
      });
      this.props.history.push("/show/"+this.props.match.params.id)
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              EDIT Response
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to={`/show/${this.state.key}`} class="btn btn-primary">Own Ride details</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="from">From:</label>
                <input type="text" class="form-control" name="from" value={this.state.from} onChange={this.onChange} placeholder="From" />
              </div>
		<div class="form-group">
                <label for="via">via:</label>
                <input type="text" class="form-control" name="via" value={this.state.via} onChange={this.onChange} placeholder="Via" />
              </div>
		<div class="form-group">
                <label for="to">To:</label>
                <input type="text" class="form-control" name="to" value={this.state.to} onChange={this.onChange} placeholder="To" />
              </div>
              <div class="form-group">
                <label for="comments">Comments:</label>
                <input type="text" class="form-control" name="comments" value={this.state.comments} onChange={this.onChange} placeholder="Comments" />
              </div>
              <div class="form-group">
                <label for="seats">Vacant Seats:</label>
                <input type="text" class="form-control" name="seats" value={this.state.seats} onChange={this.onChange} placeholder="Vacant seats" />
              </div>
              <button type="submit" class="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;

